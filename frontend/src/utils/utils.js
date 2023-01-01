import {cryptoRandomStringAsync} from 'crypto-random-string';


export function getWindowHeight() {
  const {innerHeight} = window;
  return {innerHeight};
};

export function getWindowWidth() {
  const {innerWidth} = window;
  return {innerWidth};
};

export function randomCharacter() {
  return cryptoRandomStringAsync({length: 10});
}


export const typeLogin={
  LOGIN_OAUTH2:"LOGIN_OAUTH2",
  LOGIN_TRADITIONAL:"LOGIN_TRADITIONAL"
}