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


