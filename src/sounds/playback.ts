import { Howl } from "howler";

export const successAuthSound: Howl = new Howl({
  src: ["/src/sounds/soundscape/authSuccess.mp3"],
});

export const errorAuthSound: Howl = new Howl({
  src: ["/src/sounds/soundscape/authError.mp3"],
});

export const logoutSound: Howl = new Howl({
  src: ["/src/sounds/soundscape/logout.mp3"],
});

export const successSound: Howl = new Howl({
  src: ["/src/sounds/soundscape/success.mp3"],
});

export const errorSound: Howl = new Howl({
  src: ["/src/sounds/soundscape/error.mp3"],
});
