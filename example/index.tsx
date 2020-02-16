import "react-app-polyfill/ie11"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { useSrollSync } from "../."

const App = () => {
  const ref1 = React.useRef<HTMLDivElement>(null)
  const ref2 = React.useRef<HTMLDivElement>(null)
  const ref3 = React.useRef<HTMLDivElement>(null)

  useSrollSync([ref1, ref2, ref3])

  return (
    <>
      <div
        ref={ref1}
        style={{
          overflow: "auto",
          maxWidth: "300px",
          maxHeight: "200px"
        }}
      >
        <p style={{ width: "500px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          dictum sagittis augue, quis scelerisque mauris euismod vitae.
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
          commodo ac, aliquet eget magna.
        </p>
      </div>
      <br />
      <div
        ref={ref2}
        style={{
          overflow: "auto",
          maxWidth: "300px",
          maxHeight: "200px"
        }}
      >
        <p style={{ width: "500px" }}>
          x Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          dictum sagittis augue, quis scelerisque mauris euismod vitae.
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
          commodo ac, aliquet eget magna.
        </p>
      </div>

      <div
        ref={ref3}
        style={{
          overflow: "auto",
          maxWidth: "300px",
          maxHeight: "300px"
        }}
      >
        <p style={{ width: "1100px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          dictum sagittis augue, quis scelerisque mauris euismod vitae.
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
          commodo ac, aliquet eget magna. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Suspendisse dictum sagittis augue, quis
          scelerisque mauris euismod vitae. Vestibulum elit nisi, porta ut elit
          tincidunt, eleifend fermentum mauris. Proin sapien massa, elementum
          quis imperdiet sit amet, feugiat vitae mi. Praesent bibendum mi ac
          ultricies feugiat. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Donec vel dolor eleifend, imperdiet lorem vel, consectetur
          mi. Praesent ultricies libero non nulla elementum porta. Morbi viverra
          varius libero. Donec dolor magna, sodales at commodo ac, aliquet eget
          magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Suspendisse dictum sagittis augue, quis scelerisque mauris euismod
          vitae. Vestibulum elit nisi, porta ut elit tincidunt, eleifend
          fermentum mauris. Proin sapien massa, elementum quis imperdiet sit
          amet, feugiat vitae mi. Praesent bibendum mi ac ultricies feugiat.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec
          vel dolor eleifend, imperdiet lorem vel, consectetur mi. Praesent
          ultricies libero non nulla elementum porta. Morbi viverra varius
          libero. Donec dolor magna, sodales at commodo ac, aliquet eget magna.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          dictum sagittis augue, quis scelerisque mauris euismod vitae.
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
          commodo ac, aliquet eget magna. malesuada fames ac ante ipsum primis
          in faucibus. Donec vel dolor eleifend, imperdiet lorem vel,
          consectetur mi. Praesent ultricies libero non nulla elementum porta.
          Morbi viverra varius libero. Donec dolor magna, sodales at commodo ac,
          aliquet eget magna. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Suspendisse dictum sagittis augue, quis scelerisque mauris
          euismod vitae. Vestibulum elit nisi, porta ut elit tincidunt, eleifend
          fermentum mauris. Proin sapien massa, elementum quis imperdiet sit
          amet, feugiat vitae mi. Praesent bibendum mi ac ultricies feugiat.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec
          vel dolor eleifend, imperdiet lorem vel, consectetur mi. Praesent
          ultricies libero non nulla elementum porta. Morbi viverra varius
          libero. Donec dolor magna, sodales at commodo ac, aliquet eget magna.
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
          commodo ac, aliquet eget magna.
        </p>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
