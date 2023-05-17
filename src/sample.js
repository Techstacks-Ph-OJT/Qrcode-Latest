import React, { useState, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import './App.css';

function QRGenerator() {
  const [data, setData] = useState('https://techstacksph.com/');
  const [size, setSize] = useState(10);
  const [logo, setLogo] = useState(null);
  const [margin, setMargin] = useState(0);
  const [dotMode, setDotMode] = useState('rounded');
  const [dotColor1, setDotColor1] = useState('#000000');
  const [dotColor2, setDotColor2] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    renderQRCode();
  }, [size, data, dotMode, dotColor1, dotColor2, bgColor]);

  let qrCode;
  let options; // Define options variable
  
  // ...
  
  const renderQRCode = () => {
    options = {
      width: size * 10,
      height: size * 10,
      type: 'png',
      data: data,
      dotsOptions: {
        color: dotColor1,
        type: dotMode,
        gradient: {
          type: 'linear',
          colorStops: [
            {
              offset: 0,
              color: dotColor1,
            },
            {
              offset: 1,
              color: dotColor2,
            },
          ],
        },
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        margin: margin,
      },
    };

    if (logo) {
      options.image = URL.createObjectURL(logo);
      options.imageOptions.margin = margin;
    }
  
    qrCode = new QRCodeStyling(options);
    const canvasEl = document.querySelector('#canvas');
    canvasEl.innerHTML = '';
    qrCode.append(canvasEl);
    canvasEl.nextElementSibling.innerHTML = `${options.width}px x ${options.height}px`;
  };
  

  const handleDataChange = (e) => {
    setData(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleLogoChange = (e) => {
    if (e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };

  const handleClearClick = () => {
    setLogo(null);
  };

  const handleMarginChange = (e) => {
    setMargin(e.target.value);
  };  

  const handleDotModeChange = (e) => {
    setDotMode(e.target.value);
  };

  const handleDotColor1Change = (e) => {
    setDotColor1(e.target.value);
  };

  const handleDotColor2Change = (e) => {
    setDotColor2(e.target.value);
  };

  const handleBgColorChange = (e) => {
    setBgColor(e.target.value);
  };

  const handleDownloadClick = () => {
    if (qrCode) {
      qrCode.download({ name: 'qr', extension: 'svg' });
    }
  };

  const browse = () => {
    document.getElementById('logo').click();
  };

  return (
    <div className="container">
      <div className="setting">
        <div className="input-wrap">
          <label htmlFor="data">Data</label>
          <textarea
            id="data"
            className="input-1x"
            value={data}
            onChange={handleDataChange}
          ></textarea>
        </div>
        <div className="input-wrap">
          <label htmlFor="size">Size</label>
          <input
            type="range"
            id="size"
            min="10"
            max="30"
            value={size}
            onChange={handleSizeChange}
            className="input-1x"
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="logo">Logo</label>
          <input
            type="file"
            id="logo"
            hidden
            onChange={handleLogoChange}
          />
          <div className="input-2x">
            <a href="#" onClick={browse}>
              <span className="material-symbols-outlined">photo_camera</span>
            </a>
          </div>
          <div className="input-2x">
            <button id="clear" type="button" onClick={handleClearClick}>
              Clear
            </button>
          </div>
        </div>
        <div className="input-wrap">
          <label htmlFor="margin">Margin</label>
          <input
            type="range"
            id="margin"
            value={margin}
            min="1"
            max="30"
            className="input-1x"
            onInput={handleMarginChange}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="dot">Dot Mode</label>
          <select
            id="dot"
            className="input-1x"
            value={dotMode}
            onChange={handleDotModeChange}
          >
            <option value="square">Square</option>
            <option value="dot">Dots</option>
            <option value="rounded">Rounded</option>
            <option value="extra-rounded">Extra-Rounded</option>
            <option value="classy">Classy</option>
            <option value="classy-rounded">Classy Rounded</option>
          </select>
        </div>
        <div className="input-wrap">
          <label htmlFor="dot-color">Dot Color</label>
          <input
            type="color"
            id="dot-color1"
            className="input-2x"
            value={dotColor1}
            onChange={handleDotColor1Change}
          />
          <input
            type="color"
            id="dot-color2"
            className="input-2x"
            value={dotColor2}
            onChange={handleDotColor2Change}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="bg-color">BG Color</label>
          <input
            type="color"
            id="bg-color"
            className="input-1x"
            value={bgColor}
            onChange={handleBgColorChange}
          />
        </div>
      </div>
      <div className="display">
        <div id="canvas"></div>
        <p>{size * 10}px X {size * 10}px</p>
        <button className="btn-download" id="btn-dl" type="button" onClick={handleDownloadClick}>
          Download
        </button>
      </div>
    </div>
  );
}

export default QRGenerator;