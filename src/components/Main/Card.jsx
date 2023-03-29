
const Card = ({ name, img, status }) => {
  return (
    <div>
        <div className="relative">
            <img src={img} alt={name}
                  className="h-80 w-48 rounded-2xl hover:scale-105 duration-700 ease-in-out cursor-pointer shadow-lg"
                      />
            <p className="absolute bottom-4 left-4 text-sm font-medium text-white no-underline leading-none">{name}</p>
            {/* <p className={`${status === "Offline" 
            ? "offline" 
            : "online"}`}>{status}</p> */}
            <p
          className={`${
            status === 'Offline'
              ? 'absolute bottom-4 right-4 text-sm font-medium text-red-600 no-underline leading-none'
              : 'absolute bottom-4 right-4 text-sm font-medium text-green-600 no-underline leading-none'
          }`}
        >
          {status}
        </p>
        </div>
    </div>
  )
}

export default Card