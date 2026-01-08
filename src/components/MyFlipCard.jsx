import React from 'react'
import ReactFlipCard from 'reactjs-flip-card'


const MyFlipCard = ({ currentCard, currentIndex,flipped,setFlipped }) => {

  currentCard && console.log(currentCard)
  const styles = {
        cardFront: { 
            background:'var(--lagyzold)',
            color: 'var(--bezs)',
            borderRadius: 20,
            width: 300,
            height: 410,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding:'5px',
            fontSize:'1rem',
            textAlign:'center'
        },
        cardBack: { 
            background:'var(--lagyzold)',
            color: 'var(--bezs)',
            borderRadius: 20,
            width: 300,
            height: 410,
            display: "flex",
            flexWrap:"wrap",
            justifyContent: "center",
            alignItems: "center",
            padding:'5px',
            fontSize:'1rem'
            
        },
    }
  return (
    <div>
          <ReactFlipCard

            flipTrigger='disabled'
            flipByProp={flipped}
            onClick={()=>setFlipped(!flipped)}
            frontStyle={styles.cardFront}
            backStyle={styles.cardBack}
            frontComponent={<div>{currentCard?.question}<span title={currentIndex+1} className='cardNumber'>{currentIndex+1}</span></div>}
            backComponent={<div>{currentCard?.answer}<span title={currentIndex+1} className='cardNumber'>{currentIndex+1}</span></div>}
          />
        
      </div>
  )
}

export default MyFlipCard
