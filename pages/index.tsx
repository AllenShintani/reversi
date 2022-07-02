import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
  background-color: #19e606;
`
const Backs = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  gap: 0;
  background-color: #fff;
  transform: translate(-50%, -50%);

  th {
    position: sticky;
    top: 0;
    left: 0;
    padding: 0;
  }

  table {
    display: table;
    width: 480px;
    height: 480px;
    table-layout: fixed;
    border-collapse: collapse;
  }
`

const Grid = styled.div`
  padding: 0;
  border-collapse: collapse;
  border: solid 3px #080808;
`
const Circle = styled.div`
  width: 54px;
  height: 54px;
  background-color: #000;
  border-radius: 50%;
`

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Backs>
        <table>
          <tr>
            <Grid>
              <Circle />
            </Grid>

            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
          </tr>
          <tr>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
          </tr>
          <tr>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
          </tr>
          <tr>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
          </tr>
          <tr>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
          </tr>
          <tr>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
          </tr>
          <tr>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
          </tr>
          <tr>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
            <th>
              <Grid>
                <Circle />
              </Grid>
            </th>
          </tr>
        </table>
      </Backs>
    </Container>
  )
}

export default Home
