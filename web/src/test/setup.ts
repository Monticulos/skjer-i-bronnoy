import "@testing-library/jest-dom/vitest";

if (typeof globalThis.CSS === "undefined") {
  globalThis.CSS = {
    supports: () => false,
    escape: (s: string) => s,
  } as unknown as typeof CSS;
} else if (typeof globalThis.CSS.supports !== "function") {
  globalThis.CSS.supports = () => false;
}

if (typeof document.getAnimations !== "function") {
  document.getAnimations = () => [];
}

if (typeof Element.prototype.getAnimations !== "function") {
  Element.prototype.getAnimations = () => [];
}

if (typeof HTMLDialogElement.prototype.showModal !== "function") {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
}

if (typeof HTMLDialogElement.prototype.close !== "function") {
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
}
