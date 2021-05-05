import { html } from "@polymer/lit-element";
export const styles = html`
<style>
.check {
  cursor: pointer;
  position: relative;
  margin: auto;
  width: 18px;
  height: 25px;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);
  color:var(--check-color);
}
.check:before {
  content: "";
  position: absolute;
  top: -15px;
  left: -15px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(34,50,84,0.03);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.check svg {
  position: relative;
  z-index: 1;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: var(--check-color);
  stroke-width: 1.5;
  transform: translate3d(0, 0, 0);
}
.check svg path {
  stroke-dasharray: 60;
  stroke-dashoffset: 0;
}
.check svg polyline {
  stroke-dasharray: 22;
  stroke-dashoffset: 66;
}
.check:hover:before {
  opacity: 1;
}
.check:hover svg {
  stroke: orange;
}
#cbx:checked + .check svg {
  stroke: var(--check-color);
}
#cbx:checked:hover + .check svg {
  stroke: orange;
}
#cbx:checked + .check svg path {
  stroke-dashoffset: 60;
  transition: all 0.3s linear;
}
#cbx:checked + .check svg polyline {
  stroke-dashoffset: 42;
  transition: all 0.2s linear;
  transition-delay: 0.15s;
}
</style>
`
