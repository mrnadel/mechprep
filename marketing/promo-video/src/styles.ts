import { CSSProperties } from 'react';
import { COLORS } from './constants';

export const fullScreen: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Nunito, sans-serif',
  overflow: 'hidden',
};

export const gradientBg: CSSProperties = {
  ...fullScreen,
  background: `linear-gradient(135deg, ${COLORS.background} 0%, #E0F2FE 50%, ${COLORS.background} 100%)`,
};

export const darkBg: CSSProperties = {
  ...fullScreen,
  background: `linear-gradient(135deg, ${COLORS.backgroundDark} 0%, #1E293B 50%, ${COLORS.backgroundDark} 100%)`,
  color: COLORS.white,
};

export const tealGradientBg: CSSProperties = {
  ...fullScreen,
  background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, #2DD4BF 100%)`,
  color: COLORS.white,
};
