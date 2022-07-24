import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import styled from 'styled-components'

const Container = styled.div`
  min-width: 100vw;
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
  background-color: #e69f06;
`

const Backs = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  gap: 0;
  background-color: #07b81e;
  transform: translate(-50%, -50%);
`

const TurnPass = styled.div`
 