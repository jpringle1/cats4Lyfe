const App = () => {
  let cards = [
    { title: "Card 1", desc: "1" },
    { title: "Card 2", desc: "2" },
    { title: "Card 3", desc: "3" },
  ]

  const handleClick = () => {
    console.log("you clicked me")
  }

  return (
    <div>
      {/* <Card heading="Card 1" desc="This is 1 card" func={handleClick} /> */}
      {cards.map((item) => {
        return <Card heading={item.heading} desc={item.desc} func={handleClick} />
      })}
    </div>
  )
}

/* 
props = {
    heading: "Card 1",
    desc: "This is 1 card",
    func: () => { ... }
}
*/

const Card = ({ heading, desc, func }) => {
  return (
    <div>
      <h5>{heading}</h5>
      <p>{desc}</p>
      <button onClick={func}>click me</button>
    </div>
  )
}
