import NavIndex from "../components/NavIndex";
export default function Index() {
  return (
    <div className="bg-slate-100 text-black">
      <NavIndex />

      <section className="px-2 pt-32 md:px-0">
        <div className="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-left sm:text-5xl md:text-6xl md:text-center">
            <span className="block">
              <span className="block mt-1 text-sky-500 lg:inline lg:mt-0">WROSE</span>
            </span>
          </h1>
          <p className="w-full mx-auto text-base text-left sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">Wrapped ROSE on Oasis Sapphire enables DeFi swapping and sending ROSE while preserving privacy.</p>
          <div className="my-10">
            <a href="/send" className="px-6 py-3 mb-10 text-lg text-white bg-sky-500 rounded-md md:mb-0 hover:bg-sky-400 md:w-auto">
              Launch App
            </a>
          </div>
        </div>
        <div className="max-w-xl mx-auto mt-16 text-center">
          <img alt="" src="/images/hero.svg" />
        </div>
      </section>

      <section className="w-full mt-40 mb-10">
        <div className="text-center text-5xl">How It Works</div>
      </section>

      <section className="w-full mb-40">
        <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
          <div className="box-border relative w-full max-w-md mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none">
            <img alt="" src="/images/wrap.svg" className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20" />
          </div>
          <div className="box-border order-first w-full border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 className="m-0 text-3xl font-semibold leading-tight border-0 border-gray-300">Wrap</h2>
            <p className="pt-4 pb-8 m-0 leading-7 border-0 border-gray-300 text-lg">To “wrap”, send ROSE to the smart contract to get an equal amount of WROSE.</p>
          </div>
        </div>
      </section>

      <section className="w-full mb-40">
        <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
          <div className="box-border relative w-full max-w-md mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none">
            <img alt="" src="/images/smart-contract.svg" className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20" />
          </div>
          <div className="box-border order-first w-full border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 className="m-0 text-3xl font-semibold leading-tight border-0 border-gray-300">Smart Contract</h2>
            <p className="pt-4 pb-8 m-0 leading-7 border-0 border-gray-300 text-lg">The smart contract holds your funds. To get ROSE back, simply “unwrap” it.</p>
          </div>
        </div>
      </section>

      <section className="w-full mb-40">
        <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
          <div className="box-border relative w-full max-w-md mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none">
            <img alt="" src="/images/send.svg" className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20" />
          </div>
          <div className="box-border order-first w-full border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 className="m-0 text-3xl font-semibold leading-tight border-0 border-gray-300">Send</h2>
            <p className="pt-4 pb-8 m-0 leading-7 border-0 border-gray-300 text-lg">To send, sign a special message with your wallet to authorize sending. A relayer will tell the smart contract to start the send.</p>
          </div>
        </div>
      </section>

      <section className="w-full mb-40">
        <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
          <div className="box-border relative w-full max-w-md mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none">
            <img alt="" src="/images/recieve.svg" className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20" />
          </div>
          <div className="box-border order-first w-full border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 className="m-0 text-3xl font-semibold leading-tight border-0 border-gray-300">Recieve</h2>
            <p className="pt-4 pb-8 m-0 leading-7 border-0 border-gray-300 text-lg">The smart contract will unwrap WROSE to ROSE and anonymously send it to your crypto crush.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
