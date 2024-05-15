/* eslint-disable react/prop-types */

export default function UserMessage({ msg }) {
  const date = new Date(msg.createdAt);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return (
    <div className="d-flex align-items-center text-right justify-content-end ">
      <div className="pr-2">
        {" "}
        <span className="name">{msg?.sender?.username}</span>
        <p className="msg">{msg?.content}</p>
        <span className="name">{formattedDate}</span>
      </div>
      <div>
        <img
          src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
          width="30"
          className="img1"
        />
      </div>
    </div>
  );
}
