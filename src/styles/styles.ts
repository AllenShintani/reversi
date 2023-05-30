import styled from 'styled-components'

export const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: #e69f06;
`
export const Backs = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  gap: 0;
  background-color: #07b81e;
  transform: translate(-50%, -50%);
`

export const TurnPass = styled.div`
  position: fixed;
  top: 600px;
  left: 1100px;
  min-width: 120px;
  min-height: 10px;
  color: white;
  background-color: #1a1a1d;
`

export const BlackCountBar = styled.div`
  position: fixed;
  top: 250px;
  right: 1250px;
  min-width: 150px;
  min-height: 50px;
`

export const Grid = styled.div`
  padding: 0;
  border-collapse: collapse;
  border: solid 3px #080808;
`
export const StoneBlack = styled.div`
  width: 54px;
  height: 54px;
  background-color: #000;
  border: solid 3px #080808;
  border-radius: 50%;
`
export const StoneWhite = styled.div`
  width: 54px;
  height: 54px;
  background-color: #fffbfb;
  border: solid 3px #080808;
  border-radius: 50%;
`
export const StoneClear = styled.div`
  width: 54px;
  height: 54px;
  background-color: #07b81e;
  border-radius: 50%;
`
export const StoneYellow = styled.div`
  width: 54px;
  height: 54px;
  background-color: #c9d60b;
  border-radius: 50%;
`