export const showCursorTip = (text: string) => {
  let cursorTip = document.querySelector<HTMLDivElement>('#cursorTip')
  if (!cursorTip) {
    cursorTip = document.createElement('div')
    cursorTip.id = 'cursorTip'
    cursorTip.style.position = 'fixed'
    cursorTip.style.top = '0'
    cursorTip.style.left = '0'
    // cursorTip.style.transform = 'translate(-50%, -50%)'
    cursorTip.style.pointerEvents = 'none'
    cursorTip.style.zIndex = '-100'
    cursorTip.style.color = 'white'
    cursorTip.style.fontSize = '13px'
    cursorTip.style.padding = '6px 10px'
    cursorTip.style.borderRadius = '5px'
    cursorTip.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    cursorTip.style.fontFamily = 'sans-serif'
    cursorTip.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.7)'
    cursorTip.textContent = text
  }
  cursorTip.textContent = text
  document.body.appendChild(cursorTip)
  document.addEventListener('mousemove', (event) => {
    // cursorTip.style.top = `${event.clientY - 30}px`
    // cursorTip.style.left = `${event.clientX + 100}px`

    // use translate instead of top/left
    cursorTip.style.transform = `translate(${event.clientX + 10}px, ${event.clientY + 10}px)`
    cursorTip.style.zIndex = '100'
  })
}

export const hideCursorTip = () => {
  const cursorTip = document.querySelector('#cursorTip')
  if (cursorTip) {
    document.body.removeChild(cursorTip)
  }
}
