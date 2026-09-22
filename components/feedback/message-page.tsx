type MessagePageProps = {
  title: string
  message: string
}

function MessagePage({ title, message }: MessagePageProps) {
  return (
    <main className="mt-20 text-center">
      <h1 className="m-0 bg-linear-to-r from-[#f9572a] to-[#ffc905] bg-clip-text font-['Montserrat'] text-[5rem] font-black uppercase text-transparent">
        {title}
      </h1>

      <p className="text-2xl font-medium text-[#ddd8d8]">{message}</p>
    </main>
  )
}

export default MessagePage
