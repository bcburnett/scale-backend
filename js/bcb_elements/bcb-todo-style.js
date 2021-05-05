import { html } from '@polymer/lit-element'

export const Styles = html`

  <link rel="stylesheet" href="css/all.css">
	<style>
    :host{
      margin:auto;
      display:block;
      --input-font:Roboto;
      --input-color:var(--todo-color);
      --check-color:var(--todo-color);
      z-index:0 ;
    }
    .container{
      text-align:left;
      display:block;
      width:250px;
      border: 2px solid var(--todo-color);
      border-radius: 10px;
      color: var(--todo-color);
      padding:10px;
      background-color: rgba(0,0,0,.5);
    }

    .header__wrapper{
      position: relative;
      height:50px;
      border-radius:10px;
      bottom:0px;
      padding:5px;
    }
    .icon{
      position: absolute;
      top:5px;
      right:5px;
      border:2px solid var(--todo-color);
      background-color:rgba(0,0,0,.1);
      border-radius:50%;
      padding:4px;
    }

    .header__input{
      position: absolute;
      bottom:20px;
      left:15px;
    }

    i{
      position: relative;
      margin:0;
      padding-top:10px;
      top:5px;
      outline:none;
      cursor: pointer;
      overflow: hidden;
      background-color:rgba(0,0,0,.60);
    }

    i:hover, i:active, bcb-checkbox:hover  {
      scale:1.3;
      top:6px;
      color:orange;
    }

    i:hover::before{
  content:'delete';
  scale:1.2;
}

    .item{
      z-index: 0;
      display:grid;
      grid-template-columns: 1fr 40px 30px;
      justify-items:start;
      padding: 0px 0 0 10px;
      background-color: rgba(0,0,0,.60);
      border-radius:3px;
      margin-top: 10px;
      height:max-content;
      min-height:50px;
      position: relative;
    }

    .hidden{
      display: none;
    }
    .input{
      height: 40px;
    }

    .iteminput{
      position: absolute;
      top:15px;
      left:5px;
      border:none;
      border-bottom: 1px solid var(--todo-color);
      background:transparent;

      outline: none;
      color: var(--todo-color);
      cursor:text;
      text-align: center;
    }

    p{
      position:relative;
      font-size:1.2rem;
      font-weight: 300;
      top: 0px;
      bottom:5px;
      cursor: pointer;
      width:100%;
    }

    p:hover{
      color:orange;
      scale:1.05;
    }

  p:hover::before{
  content:'Edit ';
  scale:1.2;
}

    h3{
      border:0;
      padding:0;
      background-color: rgba(0,0,0,.60);
      border-radius:3px;
      margin-top: 10px;
      height:max-content;
      min-height:20px;
      position: relative;
      text-align:center;
    }

    bcb-checkbox{
      position: relative;
      top:5px
    }

  bcb-checkbox:hover::after{
  content:'Done';
  scale:1.2;
}

    .tooltip{
  position: relative;
  z-index: 0 ;
}

.tooltip > span{display:none}

.tooltip:hover > span{
  display:block;
  min-width:50px;
  padding:5px;
  color: #fff;
  background: rgba(0,0,0,.5);
  font-size: 11px;
  text-decoration:none;
  position:absolute;
  border-radius:5px;
  top:100%;
  left:50%;
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

  </style>
`
