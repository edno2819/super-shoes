import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [scroll_position, sumScroll] = useState(0)
  const [datas, RefreshData] = useState([])



  const getDatasAPI = () => {
    fetch('http://localhost:3000/static/shoes.json')
    .then(response => response.json())
    .then(RefreshData)
  }

  useEffect(() => {
    getDatasAPI()
  }, [])

  const handleScroll = (x) => {
    sumScroll(scroll_position + x)
    console.log(scroll_position)
    const element = document.getElementsByClassName("container")[0];
    element.scroll({
      left: scroll_position,
      behavior: 'smooth',
    })
  }

  if (!datas || !datas.length) return null;

  return (
    <div className='carrosel'>

      <div className="container" >

        {datas.map((data) => {
          const { id, name, price, oldPrice, image } = data;
          return (
            <div className='card'>
              <img src={image} />
              <span className='title'>{name}</span>
              <span className='preco-old'>R$ {oldPrice}</span>
              <button className='button-comprar'>Compre Aqui! {price}</button>
            </div>
          )
        })
        }

      </div>

      <button type='button' onClick={() => { handleScroll(-300) }} className='button-scroll'>
        <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Left" />
      </button>

      <button type='button' onClick={() => { handleScroll(300) }} className='button-scroll'>
        <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Right" />
      </button>

    </div>

  )
}

export default App;
