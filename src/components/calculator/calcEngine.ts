// Recursive descent parser for safe math evaluation.
// Supports: +, -, *, /, ^, parentheses, unary minus, decimals, functions, constants.
// Returns null on any error (malformed input, division by zero).

export function evaluate(expr: string, isDegrees = false): number | null {
  const tokens = tokenize(expr);
  if (!tokens) return null;
  try {
    const ctx = { tokens, pos: 0, isDegrees };
    const result = parseExpression(ctx);
    if (ctx.pos !== ctx.tokens.length) return null;
    if (!isFinite(result)) return null;
    return Math.round(result * 1e12) / 1e12;
  } catch {
    return null;
  }
}

type Token =
  | { type: 'number'; value: number }
  | { type: 'op'; value: string }
  | { type: 'paren'; value: '(' | ')' }
  | { type: 'fn'; value: string };

interface Ctx {
  tokens: Token[];
  pos: number;
  isDegrees: boolean;
}

function tokenize(expr: string): Token[] | null {
  const tokens: Token[] = [];
  let i = 0;
  const s = expr.replace(/\s/g, '');
  if (s.length === 0) return null;

  while (i < s.length) {
    const ch = s[i];

    if (/[0-9.]/.test(ch)) {
      let num = '';
      while (i < s.length && /[0-9.]/.test(s[i])) {
        num += s[i++];
      }
      const val = parseFloat(num);
      if (isNaN(val)) return null;
      tokens.push({ type: 'number', value: val });
      continue;
    }

    if (/[a-z]/i.test(ch)) {
      let name = '';
      while (i < s.length && /[a-z]/i.test(s[i])) {
        name += s[i++];
      }
      const lower = name.toLowerCase();
      if (lower === 'pi') {
        tokens.push({ type: 'number', value: Math.PI });
      } else if (lower === 'e' && (i >= s.length || s[i] !== '(')) {
        tokens.push({ type: 'number', value: Math.E });
      } else if (lower === 'g') {
        tokens.push({ type: 'number', value: 9.81 });
      } else if (['sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'abs'].includes(lower)) {
        tokens.push({ type: 'fn', value: lower });
      } else {
        return null;
      }
      continue;
    }

    if ('+-*/^'.includes(ch)) {
      tokens.push({ type: 'op', value: ch });
      i++;
      continue;
    }

    if (ch === '(' || ch === ')') {
      tokens.push({ type: 'paren', value: ch });
      i++;
      continue;
    }

    return null;
  }

  return tokens;
}

function peek(ctx: Ctx): Token | null {
  return ctx.tokens[ctx.pos] ?? null;
}

function consume(ctx: Ctx): Token {
  return ctx.tokens[ctx.pos++];
}

function parseExpression(ctx: Ctx): number {
  let left = parseTerm(ctx);
  while (peek(ctx)?.type === 'op' && (peek(ctx)!.value === '+' || peek(ctx)!.value === '-')) {
    const op = consume(ctx).value;
    const right = parseTerm(ctx);
    left = op === '+' ? left + right : left - right;
  }
  return left;
}

function parseTerm(ctx: Ctx): number {
  let left = parsePower(ctx);
  while (peek(ctx)?.type === 'op' && (peek(ctx)!.value === '*' || peek(ctx)!.value === '/')) {
    const op = consume(ctx).value;
    const right = parsePower(ctx);
    if (op === '/') {
      if (right === 0) throw new Error('div/0');
      left = left / right;
    } else {
      left = left * right;
    }
  }
  return left;
}

function parsePower(ctx: Ctx): number {
  const base = parseUnary(ctx);
  if (peek(ctx)?.type === 'op' && peek(ctx)!.value === '^') {
    consume(ctx);
    const exp = parseUnary(ctx);
    return Math.pow(base, exp);
  }
  return base;
}

function parseUnary(ctx: Ctx): number {
  if (peek(ctx)?.type === 'op' && peek(ctx)!.value === '-') {
    consume(ctx);
    return -parseUnary(ctx);
  }
  return parseAtom(ctx);
}

function parseAtom(ctx: Ctx): number {
  const tok = peek(ctx);
  if (!tok) throw new Error('unexpected end');

  if (tok.type === 'number') {
    consume(ctx);
    return tok.value;
  }

  if (tok.type === 'fn') {
    const fn = consume(ctx).value as string;
    if (peek(ctx)?.type !== 'paren' || peek(ctx)!.value !== '(') throw new Error('expected (');
    consume(ctx);
    const arg = parseExpression(ctx);
    if (peek(ctx)?.type !== 'paren' || peek(ctx)!.value !== ')') throw new Error('expected )');
    consume(ctx);
    return applyFn(fn, arg, ctx.isDegrees);
  }

  if (tok.type === 'paren' && tok.value === '(') {
    consume(ctx);
    const val = parseExpression(ctx);
    if (peek(ctx)?.type !== 'paren' || peek(ctx)!.value !== ')') throw new Error('expected )');
    consume(ctx);
    return val;
  }

  throw new Error('unexpected token');
}

function applyFn(fn: string, arg: number, isDegrees: boolean): number {
  const toRad = (x: number) => isDegrees ? x * Math.PI / 180 : x;
  switch (fn) {
    case 'sqrt': return Math.sqrt(arg);
    case 'abs': return Math.abs(arg);
    case 'log': return Math.log10(arg);
    case 'ln': return Math.log(arg);
    case 'sin': return Math.sin(toRad(arg));
    case 'cos': return Math.cos(toRad(arg));
    case 'tan': return Math.tan(toRad(arg));
    default: throw new Error('unknown fn');
  }
}
