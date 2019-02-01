export default class HandClock extends HTMLElement {
  constructor() {
    super();

    // Create shadow DOM and clock elements
    const shadow = this.attachShadow({mode: 'open'});
    const clockFace = document.createElement('div');
    const hourHand = document.createElement('div');
    const minuteHand = document.createElement('div');
    const secondHand = document.createElement('div');
    const style = document.createElement('style');
    const size = this.getAttribute('size');

    clockFace.setAttribute('class', 'clock-face');
    hourHand.setAttribute('class', 'hour hand');
    minuteHand.setAttribute('class', 'minute hand');
    secondHand.setAttribute('class', 'second hand');

    /*
      Display clock face using flex to easily center hands.
      Stack hands using absolute and rotate them all to an upright position.
      Use ::after element selector on each hand to create their visual components.
      This allows the base element to be the center of rotation.
      Specify a height and width for all hands based on size attribute.
    */
    style.textContent = `
      * {
        box-sizing: border-box;
      }

      .clock-face {
        align-items: center;
        justify-content: center;
        border: 2px solid black;
        border-radius: 50%;
        display: flex;
        height: ${size}px;
        width: ${size}px;
      }
      
      .hand {
        position: absolute;
        transform: rotate(-90deg);
      }

      .hand::after {
        background: black;
        content: '';
        margin-left: ${size / 50}px;
        position: absolute;
      }

      .hour::after {
        height: ${size < 200 ? 3 : 6}px;
        margin-top: -${size < 200 ? 2 : 3}px;
        width: ${size / 4}px;
      }

      .minute::after {
        height: ${size < 200 ? 2 : 4}px;
        margin-top: -${size < 200 ? 1 : 2}px;
        width: ${size / 2.7}px;
      }

      .second::after {
        height: ${size < 200 ? 1 : 2}px;
        margin-top: -1px;
        width: ${size / 2.4}px;
      }
    `
    
    // Fill shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(clockFace);
    clockFace.appendChild(hourHand);
    clockFace.appendChild(minuteHand);
    clockFace.appendChild(secondHand);

    // Use Date object to find current time
    const renderClockHands = () => {
      const time = new Date();
      let hours = null;
      let minutes = null;
      let seconds = null;

      // If UTC is set then adjust time appropriately
      if (this.hasAttribute('utc')) {
        const utc = this.getAttribute('utc');
        hours = time.getUTCHours() + parseInt(utc);
        minutes = time.getUTCMinutes();
        seconds = time.getUTCSeconds();
      } else {
        hours = time.getHours(); 
        minutes = time.getMinutes();
        seconds = time.getSeconds();
      }

      // Calculate rotations based on time
      const hourRotation = (hours / 12) * 360 + (minutes / 60) * 30 - 90;
      const minuteRotation = (minutes / 60) * 360 + (seconds / 60) * 6 - 90;
      const secondRotation = (seconds / 60) * 360 - 90;

      // Set rotation of DOM elements
      hourHand.style.transform = `rotate(${hourRotation}deg)`;
      minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
      secondHand.style.transform = `rotate(${secondRotation}deg)`;
    }

    // Update time every second
    setInterval(renderClockHands, 1000);
    renderClockHands(this);
  }
}