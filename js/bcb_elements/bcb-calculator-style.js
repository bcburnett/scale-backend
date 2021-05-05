import { html } from '@polymer/lit-element'

const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.crossOrigin = "anonymous";
link.href = "https://fonts.googleapis.com/css?family=Orbitron";
  document.head.appendChild(link);


export const Styles = html`

  <link rel="stylesheet" href="css/all.css">

      <style>
    :host {
      display:block;
      --calc-font:Orbitron;
      color: var(--calc-color);
      font-family:var(--calc-font);
      width:235px;
      margin:0;
      background: rgba(0,0,0,.5);
      border-radius: 10px;
      margin-top:15px;
        --input-font:var(--calc-font);;
      --input-color:var(--todo-color);
    }

    .hidden{
      display:none;
    }


    .container {
      max-width: 300px;
      padding: 0 10px 10px 10px;
      border: 1px solid var(--calc-color);
      border-radius: 10px;
    }

    .tooltip{
  position: relative;
  z-index: 1 ;
}

.tooltip > span{display:none}

.tooltip:hover > span{
  display:block;
  min-width:50px;
  padding:5px;
  color: #fff;
  background: rgba(0,0,0,.5);
  font-size: 11px;
  position:absolute;
  border-radius:5px;
  top:100%;
  left:40%;
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-fill-mode: both;
  text-align:center;
}

@keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}
.tooltip:hover > span:after{
  position: absolute;
  width: 10px;
  height: 10px;
  top:0;
  left: 50%;
  margin-left: -25px;
  content: '';
  transform: rotate(45deg);
  margin-top: -5px;
}
button{
  outline:none;
  width:100%;
  padding-top:4px;
  background-color:rgba(0,0,0,.75);
  color:var(--calc-color);
  border-color:var(--calc-color);
  border-width:1px;
  font-weight: bold;
  font-size:1.4rem;
  font-family:var(--calc-font);
}

button:hover{
  color:orange;
  background-color:black;
  scale:1.2;
}

.keyboard{
  padding-top:8px;
  display:grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap:3px;

}

  </style>

`
