"""Generate modal-gallery.html from scratch with all FX."""
import random, math

def R(a,b): return round(random.uniform(a,b), 1)
def pick(arr): return random.choice(arr)

def gen_hearts(n=10, colors=None):
    if not colors: colors = ['#FF4B4B','#FF7878','#FFAADE']
    return "\n    ".join(f'<div class="heart-fx" style="left:{R(0,95)}%;bottom:{R(-5,10)}%;--d:{R(3,7)}s;--dl:{R(0,8)}s;--dx:{R(-30,30)}px;--c:{pick(colors)};font-size:{R(14,24)}px">&#9829;</div>' for _ in range(n))

def gen_confetti(n=25):
    colors = ['#FF4B4B','#FFC800','#58CC02','#1CB0F6','#CE82FF','#FF9600']
    return "\n    ".join(f'<div class="confetti-fx" style="left:{R(-5,105)}%;top:-3%;width:{R(4,9)}px;height:{R(3,7)}px;--d:{R(2,5)}s;--dl:{R(0,5)}s;--spin:{R(360,1080)}deg;background:{pick(colors)};border-radius:{"50%" if random.random()>.5 else "2px"}"></div>' for _ in range(n))

def gen_stars(n=14):
    colors = ['#FFC800','#FFB100','#FBE56D','#FF9600']
    return "\n    ".join(f'<div class="star-fx" style="left:{R(5,90)}%;top:{R(5,85)}%;--d:{R(1.5,4)}s;--dl:{R(0,6)}s"><span style="font-size:{R(12,24)}px;color:{pick(colors)}">&#9733;</span></div>' for _ in range(n))

def gen_sparkles(n=20):
    colors = ['white','#FFC800','#84D8FF','#FFAADE']
    return "\n    ".join(f'<div class="sparkle-fx" style="left:{R(0,100)}%;top:{R(0,100)}%;width:{R(2,6)}px;height:{R(2,6)}px;--d:{R(1,3)}s;--dl:{R(0,5)}s;--dx:{R(-20,20)}px;--dy:{R(-20,20)}px;background:{pick(colors)}"></div>' for _ in range(n))

def gen_fireworks(bursts=3, dots=12):
    colors = ['#FF4B4B','#FFC800','#58CC02','#1CB0F6','#CE82FF']
    els = []
    for b in range(bursts):
        cx, cy, bdl = R(20,80), R(15,60), b * R(1.5,2.5)
        for i in range(dots):
            a = (i/dots)*math.pi*2; d=R(30,70)
            els.append(f'<div class="fw-fx" style="left:{cx}%;top:{cy}%;width:{R(3,5)}px;height:{R(3,5)}px;--d:{R(1.5,3)}s;--dl:{bdl+R(0,.3)}s;--fx:{math.cos(a)*d:.0f}px;--fy:{math.sin(a)*d:.0f}px;background:{pick(colors)}"></div>')
    return "\n    ".join(els)

def gen_snow(n=20):
    return "\n    ".join(f'<div class="snow-fx" style="left:{R(-5,105)}%;top:-3%;width:{R(2,4)}px;height:{R(2,4)}px;--d:{R(4,9)}s;--dl:{R(0,8)}s;--dx:{R(-30,30)}px"></div>' for _ in range(n))

def gen_bokeh(n=8):
    colors = ['rgba(168,85,247,.15)','rgba(99,102,241,.12)','rgba(236,72,153,.1)']
    return "\n    ".join(f'<div class="bokeh-fx" style="left:{R(5,85)}%;top:{R(5,85)}%;width:{R(20,50)}px;height:{R(20,50)}px;--d:{R(6,12)}s;--dl:{R(0,8)}s;--dx:{R(-30,30)}px;--dy:{R(-30,30)}px;background:{pick(colors)}"></div>' for _ in range(n))

def gen_bubbles(n=12):
    return "\n    ".join(f'<div class="bubble-fx" style="left:{R(0,100)}%;bottom:{R(-5,10)}%;width:{R(4,14)}px;height:{R(4,14)}px;--d:{R(5,10)}s;--dl:{R(0,8)}s"></div>' for _ in range(n))

def screen(label, bg, body_html, fx_html, footer_html="", has_close=False, flow=""):
    close = '<button class="x"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' if has_close else ''
    tip = f'<span class="tip" data-tip="{flow}">?</span>' if flow else ''
    return f'''<div class="cw"><div class="cl">{label} {tip}</div>
<div class="ph"><div class="sc" style="background:{bg};">
  <div class="pts">{fx_html}</div>
  {close}
  <div class="sc-body">
    <div style="text-align:center;padding:0 24px;padding-top:18vh;color:#fff;">
{body_html}
    </div>
  </div>
  {f'<div class="sc-foot">{footer_html}</div>' if footer_html else ''}
</div></div></div>'''

BTN_GOLD = '<button class="btn b-gld">CONTINUE</button>'
BTN_IND = '<button class="btn b-ind">Continue</button>'
BTN_PUR = '<button class="btn b-pur">Repair Streak</button>'

random.seed(42)

screens_html = []

# 1. Out of Hearts
screens_html.append(screen("Out of Hearts", "#CE3030",
    '      <img src="public/mascot/sad.png" width="140" height="140" style="margin-bottom:12px;" />\n      <h3 style="font-size:26px;font-weight:800;margin-bottom:20px;">Out of Hearts</h3>\n      <div class="glass" style="display:inline-block;padding:16px 28px;"><div style="font-size:11px;font-weight:600;color:rgba(255,255,255,.5);">Next heart in</div><div style="font-size:34px;font-weight:800;">4:32</div></div>',
    gen_hearts(10, ['#FF4B4B','#FF7878','#FFB2B2']),
    '<button class="btn b-gld">Get Unlimited Hearts</button>', True,
    flow="Practice lesson &#8594; Answer wrong with 0 hearts"))

# 2. Trial Prompt
screens_html.append(screen("Trial Prompt", "#5B4FCF",
    '      <img src="public/mascot/pro.png" width="160" height="160" style="margin-bottom:12px;" />\n      <h3 style="font-size:26px;font-weight:800;">Try Pro Free</h3>\n      <p style="font-size:14px;color:rgba(255,255,255,.5);margin-top:4px;">7 days, cancel anytime</p>',
    gen_sparkles(20),
    '<button class="btn b-gld">Try Pro Free for 7 Days</button><button class="btn-ghost">Maybe later</button>', True,
    flow="Complete first lesson &#8594; Result screen &#8594; Auto-opens after 2.5s (once)"))

# 3. Upgrade
screens_html.append(screen("Upgrade Modal", "#5B4FCF",
    '      <img src="public/mascot/pro.png" width="140" height="140" style="margin-bottom:12px;" />\n      <h3 style="font-size:26px;font-weight:800;">MechReady Pro</h3>\n      <p style="font-size:13px;color:rgba(255,255,255,.5);margin-top:4px;">Unlock all premium features</p>',
    gen_sparkles(20),
    '<button class="btn b-gld">Subscribe to Pro</button>', True,
    flow="Tap a locked unit on course map &#8594; Modal appears"))

# 4. Switch Course
screens_html.append(screen("Switch Course", "#1899D6",
    '      <img src="public/badges/switch-course.png" width="48" height="48" style="margin-bottom:12px;" />\n      <h3 style="font-size:22px;font-weight:900;margin-bottom:16px;">Switch Course</h3>\n      <div style="display:flex;flex-direction:column;gap:10px;width:100%;">\n        <div style="display:flex;align-items:center;gap:12px;padding:14px;border-radius:14px;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.25);"><span style="font-size:24px;">&#9881;&#65039;</span><strong style="font-size:14px;">Mechanical Engineering</strong></div>\n        <div style="display:flex;align-items:center;gap:12px;padding:14px;border-radius:14px;background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.12);"><span style="font-size:24px;">&#128268;</span><strong style="font-size:14px;">Electrical Engineering</strong></div>\n        <div style="display:flex;align-items:center;gap:12px;padding:14px;border-radius:14px;background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.12);"><span style="font-size:24px;">&#127959;&#65039;</span><strong style="font-size:14px;">Civil Engineering</strong></div>\n      </div>',
    gen_bubbles(12), "", True,
    flow="Tap course name in header &#8594; Picker opens"))

# 5a. Level Up
screens_html.append(screen("Level Up", "#3C4D6B",
    '      <img src="public/badges/level-5.png" width="88" height="88" style="margin-bottom:12px;" />\n      <div style="font-size:30px;font-weight:900;">Level 5</div>\n      <div style="font-size:14px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:12px;">Apprentice</div>\n      <div style="display:flex;align-items:center;justify-content:center;gap:6px;"><img src="public/badges/gem.png" width="18" height="18" /><span style="font-size:16px;font-weight:800;color:#A78BFA;">+15 gems</span></div>',
    gen_sparkles(20), BTN_IND,
    flow="Earn enough XP to reach a new level &#8594; Home page loads"))

# 5b. Level Up Milestone
screens_html.append(screen("Level Up (Milestone)", "#5B4FCF",
    '      <img src="public/badges/level-10.png" width="88" height="88" style="margin-bottom:12px;" />\n      <div style="font-size:30px;font-weight:900;">Level 10</div>\n      <div style="font-size:14px;font-weight:700;color:#FDE68A;margin-bottom:12px;">Journeyman</div>\n      <div style="display:flex;flex-direction:column;gap:4px;align-items:center;"><div style="display:flex;align-items:center;justify-content:center;gap:6px;"><img src="public/badges/gem.png" width="16" height="16" /><span style="font-size:15px;font-weight:800;color:#A78BFA;">+50 gems</span></div></div>',
    gen_stars(14), BTN_GOLD,
    flow="Reach level 5, 10, 15, 20, 25, or 30 &#8594; Special celebration"))

# 6. Streak Milestone
screens_html.append(screen("Streak Milestone", "#E8850C",
    '      <div style="display:inline-block;padding:4px 14px;border-radius:999px;background:rgba(255,255,255,.2);font-size:14px;font-weight:800;margin-bottom:12px;">7-Day Streak!</div>\n      <div style="font-size:26px;font-weight:800;margin-bottom:8px;">Week Warrior</div>\n      <div style="display:flex;align-items:center;justify-content:center;gap:6px;"><img src="public/badges/gem.png" width="16" height="16" /><span style="font-size:18px;font-weight:800;">+10</span><span style="font-size:13px;color:rgba(255,255,255,.5);">gems</span></div>',
    gen_confetti(30), BTN_GOLD,
    flow="Practice daily &#8594; Hit 7/14/30/60/100 day streak &#8594; Home loads"))

# 7. Welcome Back
screens_html.append(screen("Welcome Back", "#1CB0F6",
    '      <img src="public/mascot/sleeping.png" width="130" height="130" style="margin-bottom:10px;" />\n      <div style="font-size:26px;font-weight:800;">Welcome back!</div>\n      <div style="font-size:14px;color:rgba(255,255,255,.5);margin-bottom:16px;">We missed you.</div>\n      <div style="display:inline-block;padding:8px 16px;border-radius:12px;background:rgba(255,255,255,.15);font-size:14px;font-weight:600;">Away for <strong>5 days</strong></div>',
    gen_snow(20), '<button class="btn b-gld">Let\'s Go!</button>',
    flow="Be away 2+ days &#8594; Open app &#8594; Home page shows this"))

# 8. Streak Freeze
screens_html.append(screen("Streak Freeze", "#7B61D9",
    '      <img src="public/mascot/worried.png" width="130" height="130" style="margin-bottom:10px;" />\n      <div style="font-size:26px;font-weight:800;margin-bottom:4px;">Your streak broke!</div>\n      <div style="font-size:14px;color:rgba(255,255,255,.5);margin-bottom:20px;">You had a <strong style="color:#fff;">12-day streak</strong></div>\n      <div style="display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:14px;background:rgba(255,255,255,.15);"><img src="public/badges/gem.png" width="20" height="20" /><span style="font-size:22px;font-weight:800;">50</span><span style="font-size:13px;color:rgba(255,255,255,.5);">to repair</span></div>',
    gen_bokeh(8), BTN_PUR + '\n    <button class="btn-ghost">Skip</button>',
    flow="Miss a day with no freeze &#8594; Streak breaks &#8594; Home loads"))

# 9. League Winner
screens_html.append(screen("League Winner (#1)", "#E8850C",
    '      <img src="public/mascot/champion.png" width="180" height="180" style="margin-bottom:8px;" />\n      <div style="font-size:28px;font-weight:800;margin-bottom:4px;">1st Place!</div>\n      <div style="font-size:14px;color:rgba(255,255,255,.6);">You won the Gold League!</div>',
    gen_fireworks(3, 12), BTN_GOLD,
    flow="Finish #1 in weekly league &#8594; Week resets &#8594; Home loads"))

# 10. League Promoted
screens_html.append(screen("Promoted", "#58A700",
    '      <img src="public/badges/league-gold.png" width="100" height="100" style="margin-bottom:12px;" />\n      <div style="font-size:26px;font-weight:800;margin-bottom:16px;">Promoted to Gold!</div>\n      <div style="display:flex;align-items:center;justify-content:center;gap:20px;"><div><div style="font-size:26px;font-weight:800;">#2</div><div style="font-size:11px;color:rgba(255,255,255,.5);">Final Rank</div></div><div style="width:1px;height:32px;background:rgba(255,255,255,.2);"></div><div><div style="font-size:26px;font-weight:800;">+15</div><div style="font-size:11px;color:rgba(255,255,255,.5);">Gems</div></div></div>',
    gen_confetti(25), '<button class="btn b-grn">Continue</button>',
    flow="Finish top 3 in league &#8594; Week resets &#8594; Home loads"))

# 11. League Stayed
screens_html.append(screen("Stayed", "#1899D6",
    '      <img src="public/badges/league-silver.png" width="100" height="100" style="margin-bottom:12px;" />\n      <div style="font-size:26px;font-weight:800;margin-bottom:6px;">Stayed in Silver</div>\n      <div style="font-size:14px;color:rgba(255,255,255,.5);margin-bottom:16px;">Keep it up!</div>\n      <div><div style="font-size:26px;font-weight:800;">#8</div><div style="font-size:11px;color:rgba(255,255,255,.5);">Final Rank</div></div>',
    gen_bubbles(12), BTN_IND,
    flow="Finish mid-table in league &#8594; Week resets &#8594; Home loads"))

# 12. League Demoted
screens_html.append(screen("Demoted", "#CE3030",
    '      <img src="public/badges/league-bronze.png" width="100" height="100" style="margin-bottom:12px;" />\n      <div style="font-size:26px;font-weight:800;margin-bottom:6px;">Moved to Bronze</div>\n      <div style="font-size:14px;color:rgba(255,255,255,.5);margin-bottom:16px;">Keep practicing!</div>\n      <div><div style="font-size:26px;font-weight:800;">#14</div><div style="font-size:11px;color:rgba(255,255,255,.5);">Final Rank</div></div>',
    gen_hearts(8, ['#FF7878','#FFAADE','#FFB2B2']), BTN_IND,
    flow="Finish bottom 3 in league &#8594; Week resets &#8594; Home loads"))

# 13. Chapter Complete
screens_html.append(screen("Chapter Complete", "#58A700",
    '      <div style="font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:4px;">Chapter Complete</div>\n      <div style="font-size:28px;font-weight:900;margin-bottom:16px;">Thermodynamics</div>\n      <img src="public/mascot/laughing.png" width="140" height="140" style="margin-bottom:16px;" />\n      <div style="display:flex;gap:24px;"><div style="text-align:center;"><div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:2px;">Lessons</div><div style="font-size:22px;font-weight:900;">8</div></div><div style="text-align:center;"><div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:2px;">Accuracy</div><div style="font-size:22px;font-weight:900;">92%</div></div><div style="text-align:center;"><div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:2px;">XP</div><div style="font-size:22px;font-weight:900;">340</div></div></div>',
    gen_confetti(25), BTN_GOLD,
    flow="Complete all lessons in a unit &#8594; Full-screen celebration"))

# 14. Chapter Mastered
screens_html.append(screen("Chapter Mastered", "#E8850C",
    '      <div style="font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:4px;">Chapter Mastered</div>\n      <div style="font-size:28px;font-weight:900;margin-bottom:16px;">Thermodynamics</div>\n      <img src="public/mascot/excited.png" width="140" height="140" style="margin-bottom:16px;" />\n      <div style="display:flex;gap:24px;"><div style="text-align:center;"><div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:2px;">Lessons</div><div style="font-size:22px;font-weight:900;">8</div></div><div style="text-align:center;"><div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:2px;">Accuracy</div><div style="font-size:22px;font-weight:900;">97%</div></div><div style="text-align:center;"><div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:2px;">XP</div><div style="font-size:22px;font-weight:900;">480</div></div></div>',
    gen_stars(16), BTN_GOLD,
    flow="Re-complete all lessons with 3 stars &#8594; Golden celebration"))

# 15. Course Complete
screens_html.append(screen("Course Complete", "#5B4FCF",
    '      <div style="font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:6px;">Course Complete</div>\n      <div style="font-size:28px;font-weight:900;margin-bottom:4px;">The full machine.</div>\n      <div style="font-size:14px;color:rgba(255,255,255,.5);margin-bottom:16px;">Every system you mastered.</div>\n      <img src="public/mascot/celebrating.png" width="140" height="140" style="margin-bottom:16px;" />\n      <div style="display:flex;gap:5px;margin-bottom:4px;">' + ''.join(f'<div style="width:18px;height:18px;border-radius:50%;background:{c};"></div>' for c in ['#4F46E5','#2563EB','#0891B2','#059669','#16A34A','#CA8A04','#EA580C','#DC2626','#9333EA','#DB2777']) + '</div>\n      <div style="font-size:11px;color:rgba(255,255,255,.4);">10 units completed</div>',
    gen_fireworks(4, 14), BTN_GOLD,
    flow="Complete all 10 course units &#8594; Ultimate celebration"))

with open("modal-gallery.html", "w", encoding="utf-8") as f:
    f.write(f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MechReady — Modal Gallery</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *{{margin:0;padding:0;box-sizing:border-box;}}
  body{{font-family:'Inter',-apple-system,sans-serif;background:#0a0a0a;color:#fff;padding:40px 20px 80px;}}
  h1{{text-align:center;font-size:26px;font-weight:900;margin-bottom:4px;}}
  .sub{{text-align:center;font-size:12px;color:#555;margin-bottom:40px;}}
  .sec{{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2.5px;color:#444;margin:56px 0 28px;text-align:center;}}
  .g{{display:flex;flex-wrap:wrap;justify-content:center;gap:36px;}}
  .cw{{display:flex;flex-direction:column;align-items:center;gap:10px;}}
  .cl{{font-size:11px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:1px;}}
  .ph{{width:375px;height:812px;border-radius:44px;overflow:hidden;border:3px solid #2a2a2a;position:relative;box-shadow:0 24px 80px rgba(0,0,0,0.6);flex-shrink:0;}}
  .sc{{width:100%;height:100%;display:flex;flex-direction:column;position:relative;overflow:hidden;}}
  .sc-body{{flex:1;display:flex;flex-direction:column;justify-content:flex-start;overflow-y:auto;position:relative;z-index:2;}}
  .sc-foot{{flex-shrink:0;padding:0 24px 40px;position:relative;z-index:2;}}
  .pts{{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1;}}
  .x{{position:absolute;top:14px;right:14px;z-index:20;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.2);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;}}
  .x svg{{width:16px;height:16px;stroke:rgba(255,255,255,.7);}}
  .glass{{background:rgba(255,255,255,.15);backdrop-filter:blur(8px);border-radius:16px;}}
  .btn{{width:100%;padding:16px;border-radius:16px;font-size:14px;font-weight:800;color:#fff;border:none;cursor:pointer;text-align:center;display:flex;align-items:center;justify-content:center;gap:8px;transition:transform 75ms,box-shadow 75ms;user-select:none;}}
  .btn:active{{transform:translateY(4px);box-shadow:0 0 0 transparent !important;}}
  .b-gld{{background:#FFB800;box-shadow:0 4px 0 #CC9400;color:#5D4200;}}
  .b-ind{{background:#4F46E5;box-shadow:0 4px 0 #3730A3;}}
  .b-pur{{background:#7C3AED;box-shadow:0 4px 0 #5B21B6;}}
  .b-grn{{background:#16A34A;box-shadow:0 4px 0 #15803D;}}
  .btn-ghost{{width:100%;padding:10px;font-size:13px;font-weight:600;color:rgba(255,255,255,.5);background:none;border:none;cursor:pointer;text-align:center;}}

  /* Tooltip */
  .tip{{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:#333;color:#888;font-size:10px;font-weight:700;cursor:help;position:relative;vertical-align:middle;margin-left:4px;}}
  .tip:hover::after{{content:attr(data-tip);position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:#222;color:#ccc;font-size:12px;font-weight:500;padding:10px 16px;border-radius:10px;z-index:100;border:1px solid #333;box-shadow:0 4px 12px rgba(0,0,0,.5);text-transform:none;letter-spacing:0;width:max-content;max-width:340px;line-height:1.5;}}
  .tip:hover::before{{content:'';position:absolute;bottom:calc(100% + 4px);left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:#222;z-index:100;}}

  /* FX */
  .heart-fx{{position:absolute;animation:hfx var(--d,4s) var(--dl,0s) infinite ease-in-out;color:var(--c,#FF7878);}}
  @keyframes hfx{{0%{{opacity:0;transform:translateY(0) scale(.3)}}15%{{opacity:.8}}50%{{transform:translateY(-150px) translateX(var(--dx,15px)) scale(1)}}100%{{opacity:0;transform:translateY(-300px) translateX(calc(var(--dx)*2)) scale(.5)}}}}
  .confetti-fx{{position:absolute;animation:cfx var(--d,3s) var(--dl,0s) infinite linear;}}
  @keyframes cfx{{0%{{opacity:1;transform:translateY(-20px) rotate(0)}}100%{{opacity:.2;transform:translateY(500px) rotate(var(--spin,720deg))}}}}
  .star-fx{{position:absolute;animation:sfx var(--d,2.5s) var(--dl,0s) infinite ease-out;}}
  @keyframes sfx{{0%{{opacity:0;transform:scale(0) rotate(0)}}20%{{opacity:1;transform:scale(1.2) rotate(30deg)}}60%{{opacity:.7;transform:scale(.9) rotate(60deg)}}100%{{opacity:0;transform:scale(.4) rotate(90deg) translateY(-40px)}}}}
  .sparkle-fx{{position:absolute;border-radius:50%;animation:spfx var(--d,2s) var(--dl,0s) infinite ease-out;}}
  @keyframes spfx{{0%{{opacity:0;transform:scale(0)}}30%{{opacity:1;transform:scale(1)}}100%{{opacity:0;transform:scale(0) translate(var(--dx,10px),var(--dy,-10px))}}}}
  .fw-fx{{position:absolute;border-radius:50%;animation:fwfx var(--d,2.5s) var(--dl,0s) infinite ease-out;}}
  @keyframes fwfx{{0%{{opacity:0;transform:translate(0,0) scale(0)}}8%{{opacity:1;transform:scale(1)}}100%{{opacity:0;transform:translate(var(--fx,50px),var(--fy,-50px)) scale(.2)}}}}
  .snow-fx{{position:absolute;border-radius:50%;background:rgba(255,255,255,.6);animation:snfx var(--d,6s) var(--dl,0s) infinite linear;}}
  @keyframes snfx{{0%{{opacity:.7;transform:translateY(-10px) translateX(0)}}50%{{transform:translateY(50%) translateX(var(--dx,20px))}}100%{{opacity:0;transform:translateY(110%) translateX(0)}}}}
  .bokeh-fx{{position:absolute;border-radius:50%;animation:bkfx var(--d,8s) var(--dl,0s) infinite ease-in-out;}}
  @keyframes bkfx{{0%{{transform:translate(0,0);opacity:.1}}33%{{transform:translate(var(--dx,20px),var(--dy,-30px));opacity:.25}}66%{{transform:translate(calc(var(--dx)*-1),calc(var(--dy)*-.5));opacity:.12}}100%{{transform:translate(0,0);opacity:.1}}}}
  .bubble-fx{{position:absolute;border-radius:50%;background:rgba(255,255,255,.12);animation:bbfx var(--d,7s) var(--dl,0s) infinite ease-in-out;}}
  @keyframes bbfx{{0%{{opacity:0;transform:translateY(0) scale(.5)}}12%{{opacity:.5}}85%{{opacity:.2}}100%{{opacity:0;transform:translateY(-120%) scale(1.1)}}}}
</style>
</head>
<body>
<h1>MechReady — Modal Gallery</h1>
<p class="sub">16 screens &middot; Bold backgrounds &middot; Contextual FX &middot; Mascot &middot; 3D buttons pinned bottom</p>

<div class="sec">Utility Modals</div>
<div class="g">
{chr(10).join(screens_html[:4])}
</div>

<div class="sec">Celebrations</div>
<div class="g">
{chr(10).join(screens_html[4:9])}
</div>

<div class="sec">League</div>
<div class="g">
{chr(10).join(screens_html[9:12])}
</div>

<div class="sec">Chapter &amp; Course</div>
<div class="g">
{chr(10).join(screens_html[12:])}
</div>

<div style="text-align:center;margin-top:64px;padding:24px;border-top:1px solid #1a1a1a;">
  <p style="font-size:11px;color:#444;">16 screens &middot; Hearts, Confetti, Stars, Sparkles, Fireworks, Snow, Bokeh, Bubbles</p>
</div>
</body>
</html>''')

print("Generated clean modal-gallery.html with all FX")
