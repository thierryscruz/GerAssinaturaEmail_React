import React, { useState } from 'react';
import './index.css';
import rapidonet from './rapidonet.png';
import kiza from './kiza.png';
import maxis from './maxis.png';
import InputMask from "react-input-mask";
import Modal from 'react-modal';

function App() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [imagemGerada, setImagemGerada] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('logo.png');
  const [logo, setLogoAss] = useState(rapidonet)
  const [adicionarCelular, setAdicionarCelular] = useState(false);
  const [celular, setCelular] = useState("");

  function capitalizeWords(str) {
    return str.split(' ').map(word => word.slice(0, 1).toUpperCase() + word.substring(1)).join(' ');
  }

  function reloadLogo(event) {
    setLogoUrl(event.target.value);
    switch (event.target.value) {
      case 'logo.png':
        setLogoAss(rapidonet);
        break;
      case 'logo_kiza.png':
        setLogoAss(kiza);
        break;
      case 'logo_maxis.png':
        setLogoAss(maxis);
        break;
      default:
        setLogoAss(rapidonet);
        break;
    }
  }

  function gerarImagem() {
    const canvas = document.createElement('canvas');
    canvas.width = 589;
    canvas.height = 156;
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
      ctx.fillText(`${capitalizeWords(nome)}`, 47, 30);
      ctx.fillStyle = '#4faacc';
      ctx.font = 'bold 12px Arial';
      ctx.fillText(`${cargo}`, 48, 45);

      if (logoUrl === 'logo.png') {
        if (telefone == '') {
          ctx.fillStyle = '#000000';
          ctx.fillText(`+ 55 (62) 3983-8350`, 59, 73);
        } else {
          ctx.fillStyle = '#000000';
          ctx.fillText(`${telefone}`, 59, 73);
        }

        ctx.fillStyle = '#629ecc';
        if (email.indexOf('@rapidonet.com.br') !== -1) {
          ctx.fillText(`${email}`, 59, 110);
        } else {
          ctx.fillText(`${email}@rapidonet.com.br`, 59, 110);
          ctx.fillStyle = '#f4a25a';
          ctx.fillText(`www.rapidonet.com.br`, 47, 130);
        }
      }
      if (logoUrl === 'logo_kiza.png') {
        if (email.indexOf('@kiza.com.br') !== -1) {
          ctx.fillText(`${email}`, 59, 110);
        } else {
          ctx.fillStyle = '#000000';
          ctx.fillText(`${telefone}`, 59, 73);
          ctx.fillText(`${email}@kiza.com.br`, 59, 110);
          ctx.fillStyle = '#f4a25a';
          ctx.fillText(`www.kiza.com.br`, 47, 130);
        }
      }
      if (logoUrl === 'logo_maxis.png') {
        if (email.indexOf('@maxis.com.br') !== -1) {
          ctx.fillText(`${email}`, 59, 110);
        } else {
          ctx.fillStyle = '#000000';
          ctx.fillText(`${telefone}`, 59, 73);
          ctx.fillText(`${email}@maxis.com.br`, 59, 110);
          ctx.fillStyle = '#f4a25a';
          ctx.fillText(`www.maxis.com.br`, 47, 130);
        }
      }
      if (adicionarCelular === true) {
        ctx.fillStyle = '#000000';
        ctx.fillText(`${celular}`, 59, 87);
      }
      // Converte o canvas para uma imagem PNG
      const imagemPng = canvas.toDataURL('image/png');

      // Define a imagem gerada no estado para exibição na tela
      setImagemGerada(imagemPng);
    };
  }

  return (
    <div className="header">
      <h1></h1>
      <div className="logo-select">
        <img src={logoUrl} alt="Logo" className="logo-img" onAnimationStart={Animation} />
        <h1><b>Gerador Assinatura</b></h1>

        <center><label htmlFor="logo-select" style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>Selecione uma Empresa:</label></center>
        <select id="logo-select" value={logoUrl} onChange={reloadLogo} >
          <option value="logo.png">Rapidonet</option>
          <option value="logo_kiza.png">Kiza</option>
          <option value="logo_maxis.png">Maxis</option>
        </select></div>

      {logoUrl === 'logo.png' && (
        // Formulário para a empresa Rapidonet
        <div className="app">
          <h3></h3>
          <form className="form">
            <div className="form-group">
              <center><label>  Nome:</label></center>
              <input type="text" value={capitalizeWords(nome)} onChange={(event) => setNome(event.target.value.toLowerCase())} />
            </div>
            <div className="form-group">
              <center><label>Cargo:</label></center>
              <input type="text" value={cargo} onChange={(event) => setCargo(event.target.value.toUpperCase())} />
            </div>
            <div className="form-group">
              <center><label>E-mail:</label></center>
              <input type="text" value={email} onChange={(event) => setEmail(event.target.value.toLowerCase())} />
            </div>
            <div className="form-group">
              <center><label>Telefone:</label></center>
              <InputMask mask="+ 55 (62) 3983-83xx" value={telefone} onChange={(event) => setTelefone(event.target.value)} formatChars={{ 'x': '[0-9]' }} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <div className="add-cel">
                Adicionar Celular:<input type="checkbox" checked={adicionarCelular} onChange={() => setAdicionarCelular(!adicionarCelular)} />
              </div></label>
            <div className="form-group">
              {adicionarCelular && (
                <InputMask mask="+ 55 (99) 99999-9999" id="celular" name="celular" placeholder="Telefone celular" value={celular} onChange={(event) => setCelular(event.target.value)} />)}
            </div>
          </form>
          <center><button type="button" onClick={gerarImagem}>Gerar imagem</button></center>
          <br />
          {imagemGerada && (
            <div className="imagem">
              <center><img src={imagemGerada} alt="Imagem gerada a partir dos dados do formulário" />
              <button type="button" onClick={() => setModalIsOpen(true)}>Como Usar?</button></center>

              <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Example Modal">
                <h2>Como usar a Assinatura no Outlook</h2>
                <p>1. No menu do Outlook, clique em "Arquivo".</p>
                <p>2. Clique em "Opções"</p>
                <img src="./01_assinatura.png" alt="01_assinatura" />
                <p>3. Do lado direito clique em Email, e depois do lado direto localize a opção "Assinaturas...".</p>
                <img src="./02_assinatura.png" alt="02_assinatura" />
                <p>4. Clique em "Novo".</p>
                <img src="./03_assinatura.png" alt="03_assinatura" />
                <p>5. Defina um nome para a assinatura e clique em OK. Caso já exista uma assinatura, este nome deverá ser diferente do já existente.</p>
                <img src="./04_assinatura.png" alt="04_assinatura" />
                <p>6. Insira a sua assinatura no campo "Editar assinatura" (ctrl+c ctrl+v).</p>
                <p>6.1. Do lado direito selecione a conta de e-mail que deseja inserir a assinatura. Clique em OK.</p>
                <img src="./05_assinatura.png" alt="05_assinatura" />
                <p>7. Caso a assinatura seja uma imagem, clique no icone de imagem para selecionar o arquivo.</p>
                <img src="./06_assinatura.png" alt="06_assinatura" />
                <p>7.1. Selecione a imagem da assinatura e em seguida clique no botão "inserir".</p>
                <img src="./07_assinatura.png" alt="07_assinatura" />
                <p>7.2 Selecione a conta de e-mail que deseja inserir a assinatura, como mostra no passo 6.1, e clique em OK.</p>
                <button onClick={() => setModalIsOpen(false)}>Fechar</button>
              </Modal>
            </div>
          )}
        </div>
      )}
      {logoUrl === 'logo_kiza.png' && (
        // Formulário para a empresa Kiza
        <div className="app">
          <h3></h3>
          <form className="form">
            <div className="form-group">
              <center><label>Nome:</label></center>
              <input type="text" value={capitalizeWords(nome)} onChange={(event) => setNome(event.target.value.toLowerCase())} />

            </div>
            <div className="form-group">
              <center><label>Cargo:</label></center>
              <input type="text" value={cargo} onChange={(event) => setCargo(event.target.value.toUpperCase())} />
            </div>
            <div className="form-group">
              <center><label>E-mail:</label></center>
              <input type="text" value={email} onChange={(event) => setEmail(event.target.value.toLowerCase())} />

            </div>
            <div className="form-group">
              <center><label>Telefone:</label></center>
              <InputMask mask="+ 55 (xx) xxxx-xxxx" value={telefone} onChange={(event) => setTelefone(event.target.value)} formatChars={{ 'x': '[0-9]' }} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <div className="add-cel">
                Adicionar Celular:<input type="checkbox" checked={adicionarCelular} onChange={() => setAdicionarCelular(!adicionarCelular)} />
              </div></label>
            <div className="form-group">
              {adicionarCelular && (
                <InputMask mask="+ 55 (99) 99999-9999" id="celular" name="celular" placeholder="Telefone celular" value={celular} onChange={(event) => setCelular(event.target.value)} />)}
            </div>
          </form>
          <center><button type="button" onClick={gerarImagem}>Gerar imagem</button></center>
          <br />
          {imagemGerada && (
            <div className="imagem">
              <img src={imagemGerada} alt="Imagem gerada a partir dos dados do formulário" />
              <br />
              <center><button onClick={() => setModalIsOpen(true)}>Como Usar?</button></center>

              <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Example Modal">
                <h2>Como usar a Assinatura no Outlook</h2>
                <p>1. No menu do Outlook, clique em "Arquivo".</p>
                <p>2. Clique em "Opções"</p>
                <img src="./01_assinatura.png" alt="01_assinatura" />
                <p>3. Do lado direito clique em Email, e depois do lado direto localize a opção "Assinaturas...".</p>
                <img src="./02_assinatura.png" alt="02_assinatura" />
                <p>4. Clique em "Novo".</p>
                <img src="./03_assinatura.png" alt="03_assinatura" />
                <p>5. Defina um nome para a assinatura e clique em OK. Caso já exista uma assinatura, este nome deverá ser diferente do já existente.</p>
                <img src="./04_assinatura.png" alt="04_assinatura" />
                <p>6. Insira a sua assinatura no campo "Editar assinatura" (ctrl+c ctrl+v).</p>
                <p>6.1. Do lado direito selecione a conta de e-mail que deseja inserir a assinatura. Clique em OK.</p>
                <img src="./05_assinatura.png" alt="05_assinatura" />
                <p>7. Caso a assinatura seja uma imagem, clique no icone de imagem para selecionar o arquivo.</p>
                <img src="./06_assinatura.png" alt="06_assinatura" />
                <p>7.1. Selecione a imagem da assinatura e em seguida clique no botão "inserir".</p>
                <img src="./07_assinatura.png" alt="07_assinatura" />
                <p>7.2 Selecione a conta de e-mail que deseja inserir a assinatura, como mostra no passo 6.1, e clique em OK.</p>
                <button onClick={() => setModalIsOpen(false)}>Fechar</button>
              </Modal>
            </div>
          )}
        </div>
      )
      }
      {
        logoUrl === 'logo_maxis.png' && (
          // Formulário para a empresa Maxis
          <div className="app">
            <h3></h3>
            <form className="form">
              <div className="form-group">
                <center><label>Nome:</label></center>
                <input type="text" value={capitalizeWords(nome)} onChange={(event) => setNome(event.target.value.toLowerCase())} />

              </div>
              <div className="form-group">
                <center><label>Cargo:</label></center>
                <input type="text" value={cargo} onChange={(event) => setCargo(event.target.value.toUpperCase())} />

              </div>
              <div className="form-group">
                <center><label>E-mail:</label></center>
                <input type="text" value={email} onChange={(event) => setEmail(event.target.value.toLowerCase())} />

              </div>
              <div className="form-group">
                <center><label>Telefone:</label></center>
                <InputMask mask="+ 55 (xx) xxxx-xxxx" value={telefone} onChange={(event) => setTelefone(event.target.value)} formatChars={{ 'x': '[0-9]' }} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <div className="add-cel">
                  Adicionar Celular:<input type="checkbox" checked={adicionarCelular} onChange={() => setAdicionarCelular(!adicionarCelular)} />
                </div></label>
              <div className="form-group">
                {adicionarCelular && (
                  <InputMask mask="+ 55 (99) 99999-9999" id="celular" name="celular" placeholder="Telefone celular" value={celular} onChange={(event) => setCelular(event.target.value)} />)}
              </div>
            </form>
            <center><button type="button" onClick={gerarImagem}>Gerar imagem</button></center>
            <br />
            {
              imagemGerada && (
                <div className="imagem">
                  <img src={imagemGerada} alt="Imagem gerada a partir dos dados do formulário" />
                  <br />
                  <center><button onClick={() => setModalIsOpen(true)}>Como Usar?</button></center>

                  <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Example Modal">
                    <h2>Como usar a Assinatura no Outlook</h2>
                    <p>1. No menu do Outlook, clique em "Arquivo".</p>
                    <p>2. Clique em "Opções"</p>
                    <img src="./01_assinatura.png" alt="01_assinatura" />
                    <p>3. Do lado direito clique em Email, e depois do lado direto localize a opção "Assinaturas...".</p>
                    <img src="./02_assinatura.png" alt="02_assinatura" />
                    <p>4. Clique em "Novo".</p>
                    <img src="./03_assinatura.png" alt="03_assinatura" />
                    <p>5. Defina um nome para a assinatura e clique em OK. Caso já exista uma assinatura, este nome deverá ser diferente do já existente.</p>
                    <img src="./04_assinatura.png" alt="04_assinatura" />
                    <p>6. Insira a sua assinatura no campo "Editar assinatura" (ctrl+c ctrl+v).</p>
                    <p>6.1. Do lado direito selecione a conta de e-mail que deseja inserir a assinatura. Clique em OK.</p>
                    <img src="./05_assinatura.png" alt="05_assinatura" />
                    <p>7. Caso a assinatura seja uma imagem, clique no icone de imagem para selecionar o arquivo.</p>
                    <img src="./06_assinatura.png" alt="06_assinatura" />
                    <p>7.1. Selecione a imagem da assinatura e em seguida clique no botão "inserir".</p>
                    <img src="./07_assinatura.png" alt="07_assinatura" />
                    <p>7.2 Selecione a conta de e-mail que deseja inserir a assinatura, como mostra no passo 6.1, e clique em OK.</p>
                    <button onClick={() => setModalIsOpen(false)}>Fechar</button>
                  </Modal>
                </div>
              )
            }
          </div >
        )
      }
    </div >
  );
}
export default App;
