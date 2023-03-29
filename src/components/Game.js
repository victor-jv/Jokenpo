import "./Game.css";
import React from "react";
import { useRef } from "react";
import Modal from "react-modal";
import { useState } from "react";
import Inter from "../images/Inter.svg";
import Stone from "../images/Stone.svg";
import Paper from "../images/Paper.svg";
import Paperbot from "../images/Paperbot.svg";
import Scissors from "../images/Scissors.svg";
import Stonebot from "../images/Stonebot.svg";
import Scissorsbot from "../images/Scissorsbot.svg";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
config.apiKey = "DEEAE5FF-51CF-403E-94C6-9418142EB125";

library.add(fab, faGithub, faLinkedin, faInstagram);

Modal.setAppElement("#root");

function Game() {
  var [choiceUser, setchoiceUser] = useState(0);
  var [textcolor, settextcolor] = useState(0);
  var [pointuser, setPointuser] = useState(0);
  var [pointbot, setPointbot] = useState(0);
  var [result, setResult] = useState("");
  var [name, setName] = useState("");
  var [bot, setBot] = useState(0);
  var [verifi, setVerifi] = useState(1);

  const ModalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: "20px",
      marginRight: "-50%",
      textAlign: "center",
      borderRadius: "10px",
      backgroundColor: "#00ff7d",
      border: "2px solid #00ff7d",
      transform: "translate(-50%, -50%)",
      fontFamily: "Montserrat, sans-serif",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
  const ModalButton = {
    backgroundColor: "#009257",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };
  const ModalText = {
    marginTop: "10px",
    fontWeight: "600",
    marginBottom: "10px",
  };

  const divRef = useRef(null);
  const inpRef = useRef(null);
  const btnRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(!isOpen);
  };

  function savename() {
    setName(document.getElementById("name").value);
    setVerifi(1);
    setchoiceUser(0);
    hiden();
  }

  function resu() {
    if (divRef.current && name.length === 0) {
      const resuText = {
        display: "none",
      };
    } else {
      const resuText = {
        display: "block",
      };
    }
  }

  const hiden = () => {
    if (divRef.current && name.length === 0) {
      showModal();
    } else {
      setVerifi(2);
      divRef.current.style.display = "block";
      inpRef.current.style.display = "none";
      btnRef.current.style.display = "none";
    }
  };

  var choice = (choiceUser) => {
    setchoiceUser(choiceUser);
    if (name.length === 0 && verifi === 1 ) {
      showModal();
    } else {
      if (choiceUser > 0 && name) {
        go(choiceUser);
      }
    }
  };
  function go(choiceUser) {
    //Random
    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var bot = randomIntFromInterval(1, 3);
    //print
    switch (bot) {
      case 1:
        setBot(1);
        bot = "pedra";
        resultado(choiceUser);
        break;
      case 2:
        setBot(2);
        bot = "papel";
        resultado(choiceUser);
        break;
      default:
        setBot(3);
        bot = "tesoura";
        resultado(choiceUser);
        break;
    }
    //resultado
    function resultado(choiceUser) {
      if (bot == "pedra" && choiceUser == 1) {
        setResult("EMPATE");
        settextcolor(2);
      } else {
        if (bot == "pedra" && choiceUser == 2) {
          setPointuser(pointuser + 1);
          setResult("VOCÊ GANHOU!");
          settextcolor(1);
        } else {
          if (bot == "pedra" && choiceUser == 3) {
            setPointbot(pointbot + 1);
            setResult("VOCÊ PERDEU");
            settextcolor(3);
          } else {
            if (bot == "papel" && choiceUser == 2) {
              setResult("EMPATE");
              settextcolor(2);
            } else {
              if (bot == "papel" && choiceUser == 3) {
                setPointuser(pointuser + 1);
                setResult("VOCÊ GANHOU!");
                settextcolor(1);
              } else {
                if (bot == "papel" && choiceUser == 1) {
                  setPointbot(pointbot + 1);
                  setResult("VOCÊ PERDEU");
                  settextcolor(3);
                } else {
                  if (bot == "tesoura" && choiceUser == 3) {
                    setResult("EMPATE");
                    settextcolor(2);
                  } else {
                    if (bot == "tesoura" && choiceUser == 1) {
                      setPointuser(pointuser + 1);
                      setResult("VOCÊ GANHOU!");
                      settextcolor(1);
                    } else {
                      if (bot == "tesoura" && choiceUser == 2) {
                        setPointbot(pointbot + 1);
                        setResult("VOCÊ PERDEU");
                        settextcolor(3);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return (
    <div className="container">
      <header>
        <h1>JOKENPÔ</h1>
      </header>
      <div className="container--center">
        <div className="result--table">
          <input
            ref={inpRef}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            placeholder=" Digite seu nome..."
          />
          <input
            ref={btnRef}
            id="namebtn"
            type="button"
            value="Começar"
            onClick={savename}
          />
          <div ref={divRef} id="meuDiv" className="result--table--texts">
            <div className="centerP">
            <h2>PLACAR</h2>
            </div>
            <h2>
              {name}: {pointuser}
            </h2>
            <h2>Bot: {pointbot}</h2>
          </div>
          <Modal
            id="showmodal"
            isOpen={isOpen}
            onRequestClose={showModal}
            style={ModalStyle}
          >
            <h2>Coloque um nome!</h2>
            <p style={ModalText}>
              O jogo não pode começar <br /> sem você ter digitado um nome.
            </p>
            <button onClick={showModal} style={ModalButton}>
              Ok
            </button>
          </Modal>
        </div>
      </div>
      <div className="result">
        <div
          className="result--box"
          style={
            name.length != 0 && verifi === 2
              ? {
                  backgroundImage:
                    choiceUser === 1
                      ? `url(${Stone})`
                      : choiceUser === 2
                      ? `url(${Paper})`
                      : choiceUser === 3
                      ? `url(${Scissors})`
                      : "",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }
              : {}
          }
        ></div>
        <h1>VS</h1>
        <div
          className="result--box2"
          style={
            name.length != 0 && verifi === 2
              ? {
                  backgroundImage:
                    bot === 1
                      ? `url(${Stonebot})`
                      : bot === 2
                      ? `url(${Paperbot})`
                      : bot === 3
                      ? `url(${Scissorsbot})`
                      : "",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }
              : {}
          }
        ></div>
      </div>
      <div className="choice">
        <input
          id="stone"
          className="choice--button"
          type="button"
          onClick={() => choice(1)}
          style={{
            backgroundImage: `url(${Stone})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <input
          id="paper"
          className="choice--button"
          type="button"
          onClick={() => choice(2)}
          style={{
            backgroundImage: `url(${Paper})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <input
          id="scissors"
          className="choice--button"
          type="button"
          onClick={() => choice(3)}
          style={{
            backgroundImage: `url(${Scissors})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
      </div>
      <div className="container--text">
        <h1
          style={{
            color:
              textcolor === 1
                ? `#00ea33`
                : textcolor === 2
                ? `#ffc400`
                : textcolor === 3
                ? `#ff0000`
                : "",
            textShadow:
              textcolor === 1
                ? `0px 1px 0 #019e19, 0px 2px 0 #019e19, 0px 4px 0 #019e19`
                : textcolor === 2
                ? `0px 1px 0 #d1a000, 0px 2px 0 #d1a000, 0px 4px 0 #d1a000`
                : textcolor === 3
                ? `0px 1px 0 #900101, 0px 2px 0 #900101, 0px 4px 0 #900101`
                : "",
                fontSize: `30px`
          }}
        >
          {result}
        </h1>
      </div>
      <footer className="footer">
        <h5>DESENVOLVIDO POR JOÃO VICTOR</h5>
        <div class="footer-icons">
          <ul>
            <li>
              <a href="https://github.com/victor-jv/victor-jv">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/jo%C3%A3o-victor-de-vaconcelos-b749751a5/">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/jvictorr.jv/">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
export default Game;