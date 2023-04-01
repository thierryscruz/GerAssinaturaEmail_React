import React, { useState } from 'react';
import './index.css';
import logo from './rapidonet.png';
import InputMask from "react-input-mask";


function App() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [imagemGerada, setImagemGerada] = useState('');

  function gerarImagem() {
    const canvas = document.createElement('canvas');
    canvas.width = 589;
    canvas.height = 154;
    const ctx = canvas.getContext('2d');


    // Desenha a imagem de fundo
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // fundo transparente
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Define a fonte e cor do texto
      ctx.font = 'bold 21px Arial';
      ctx.fillStyle = '#165b8e';

      // Escreve os dados do formulário na imagem
      ctx.fillText(`${nome}`, 47, 30);
      ctx.fillStyle = '#4faacc';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(`${cargo}`, 48, 45);
      ctx.fillStyle = '#000000';
      ctx.fillText(`${telefone}`, 59, 73);
      ctx.fillStyle = '#629ecc';
      ctx.fillText(`${email}`, 59, 110);
      ctx.fillStyle = '#f4a25a';
      ctx.fillText(`www.rapidonet.com.br`, 47, 130);
      

      // Converte o canvas para uma imagem PNG
      const imagemPng = canvas.toDataURL('image/png');

      // Define a imagem gerada no estado para exibição na tela
      setImagemGerada(imagemPng);
    };
  }

  return (
    <div className="app">
       <img src="/logo.png" alt="Logo" />
      <h1><b>Gerador Assinatura</b></h1>
      <form>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} />
        </label>
        <label>
          Cargo:
          <input type="text" value={cargo} onChange={(event) => setCargo(event.target.value.toUpperCase())} />
        </label>
        <label>
          E-mail:
          <InputMask mask="" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="exemplo@rapidonet.com.br" prefix="@" />
        </label>
        <label>
          Telefone:
          <InputMask mask="+ 55 (99) 9999-9999"  value={telefone} onChange={(event) => setTelefone(event.target.value)} />
        </label>
        <button type="button" onClick={gerarImagem}>Gerar imagem</button>
      </form>
      <br />
      {imagemGerada && (
        <div className="imagem">
          <img src={imagemGerada} alt="Imagem gerada a partir dos dados do formulário" />
          <br />
          <button onClick={() => setImagemGerada('')}>Fechar</button>
        </div>
        
      )}

    </div>
  );
}

export default App;
