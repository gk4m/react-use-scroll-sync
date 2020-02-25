import "react-app-polyfill/ie11"
import * as React from "react"
import * as ReactDOM from "react-dom"
import styled from "styled-components"
import { useScrollSync, Options } from "../."

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendis
          sedictum sagittis augue, quis scelerisque mauris euismod vitae.
          Vestibulum elit nisi, porta ut elit tincidunt, eleifend fermentum
          mauris. Proin sapien massa, elementum quis imperdiet sit amet, feugiat
          vitae mi. Praesent bibendum mi ac ultricies feugiat. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Donec vel dolor
          eleifend, imperdiet lorem vel, consectetur mi. Praesent ultricies
          libero non nulla elementum porta. Morbi viverra varius libero. Donec
          dolor magna, sodales at commodo ac, aliquet eget magna. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Suspendisse dictum
          sagittis augue, quis scelerisque mauris euismod vitae. Vestibulum elit
          nisi, porta ut elit tincidunt, eleifend fermentum mauris. Proin sapien
          massa, elementum quis imperdiet sit amet, feugiat vitae mi. Praesent
          bibendum mi ac ultricies feugiat. Interdum et malesuada fames ac ante
          ipsum primis in faucibus. Donec vel dolor eleifend, imperdiet lorem
          vel, consectetur mi. Praesent ultricies libero non nulla elementum
          porta. Morbi viverra varius libero. Donec dolor magna, sodales at
          commodo ac, aliquet eget magna.`

const Page = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  justify-content: center;
  font-family: "Open Sans", sans-serif;
`
const Container = styled.div`
  display: flex;
  max-width: 1100px;
  justify-content: center;
  flex-wrap: wrap;
`

const Box = styled.div<{ width?: number }>`
  overflow: auto;
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : "auto")};
  max-height: 300px;
  margin: 10px;

  > div {
    margin: 0;
    overflow: initial;
  }
`

const Card = styled.div`
  padding: 15px;
  margin: 10px;
  max-height: 320px;
  background: #fff;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`

const P = styled.p`
  font-size: 16px;
  line-height: 20px;
`

const Flex = styled.div`
  display: flex;
`
const Controler = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  width: 100px;
  padding: 15px;
  font-size: 14px;
  background: #444;
  color: #fff;
`

const App = () => {
  const [options, setOptions] = React.useState<Options>({
    horizontal: true,
    vertical: true,
    proportional: true
  })
  const ref1 = React.useRef<HTMLDivElement>(null)
  const ref2 = React.useRef<HTMLDivElement>(null)
  const ref3 = React.useRef<HTMLDivElement>(null)
  const ref4 = React.useRef<HTMLDivElement>(null)

  useScrollSync([ref1, ref2, ref3, ref4], options)

  return (
    <Page>
      <Controler>
        <Flex>
          <label htmlFor="horizontal">horizontal</label>
          <input
            id="horizontal"
            type="checkbox"
            onChange={() => {
              setOptions({
                ...options,
                horizontal: !options.horizontal
              })
            }}
            checked={options.horizontal}
          />
        </Flex>

        <Flex>
          <label htmlFor="vertical">vertical</label>
          <input
            id="vertical"
            type="checkbox"
            onChange={() => {
              setOptions({
                ...options,
                vertical: !options.vertical
              })
            }}
            checked={options.vertical}
          />
        </Flex>

        <Flex>
          <label htmlFor="proportional">proportional</label>
          <input
            id="proportional"
            type="checkbox"
            onChange={() => {
              setOptions({
                ...options,
                proportional: !options.proportional
              })
            }}
            checked={options.proportional}
          />
        </Flex>
      </Controler>

      <Container>
        <Card>
          <Box ref={ref1} width={300}>
            <Box width={500}>
              <P>{text}</P>
              <P>{text}</P>
            </Box>
          </Box>
        </Card>

        <Card>
          <Box ref={ref2} width={300}>
            <Box width={500}>
              <P>{text}</P>
              <P>{text}</P>
            </Box>
          </Box>
        </Card>

        <Card>
          <Box ref={ref3} width={300}>
            <Box width={800}>
              <P>{text}</P>
              <P>{text}</P>
              <P>{text}</P>
              <P>{text}</P>
            </Box>
          </Box>
        </Card>

        <Card>
          <Box ref={ref4} width={300}>
            <Box width={1100}>
              <P>{text}</P>
              <P>{text}</P>
              <P>{text}</P>
              <P>{text}</P>
              <P>{text}</P>
              <P>{text}</P>
              <P>{text}</P>
              <P>{text}</P>
            </Box>
          </Box>
        </Card>
      </Container>
    </Page>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
