import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Profile = () => {
  const [LikedBooks, setLikedBooks] = useState([]);
  const [ReadBooks, setReadBooks] = useState([]);
  const [DownloadedBooks, setDownloadedBooks] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    GetBooks();
  }, []);

  async function GetBooks() {
    try {
      const response = await fetch(
        "https://react-backend-49bcf-default-rtdb.firebaseio.com/ReaderBooks.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const books = await response.json();
      let userId = localStorage.getItem("userId");
      let tempLiked = [],
        tempRead = [],
        tempDownloaded = [];
      for (let key in books) {
        if (books[key]["userId"] == userId) {
          books[key]["RDL"].includes("R") &&
            (tempRead = [...tempRead, books[key]]);
          books[key]["RDL"].includes("D") &&
            (tempDownloaded = [...tempDownloaded, books[key]]);
          books[key]["RDL"].includes("L") &&
            (tempLiked = [...tempLiked, books[key]]);
        }
      }
      setLoaded(true);
      setLikedBooks((prev) => tempLiked);
      setReadBooks((prev) => tempRead);
      setDownloadedBooks((prev) => tempDownloaded);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="profilePage w-full flex flex-wrap pt-10 justify-center align-top pb-10">
      <div className="info w-72 justify-center left-0 flex flex-col mb-10 mr-32">
        <div className="image w-48 h-48 mb-3 rounded-full overflow-hidden m-auto -mt-5 bg-slate-200">
          <img alt="profile" src="/images/profile image.png" />
        </div>
        <span className="text-2xl text-purple-900">
          {localStorage.getItem("Name")?.toUpperCase()}
        </span>
        <div className="readDownload pt-5 flex flex-col text-purple-600">
          <span>
            Like:{" "}
            <span className="text-purple-900 font-bold">
              {LikedBooks.length}
            </span>
            {LikedBooks.length > 1 ? " Books" : " Book"}
          </span>
          <span>
            Read:{" "}
            <span className="text-purple-900 font-bold">
              {ReadBooks.length}
            </span>{" "}
            Books
          </span>
          <span>
            Download:{" "}
            <span className="text-purple-900 font-bold">
              {DownloadedBooks.length}
            </span>{" "}
            Books
          </span>
        </div>
      </div>
      <div className="history flex flex-wrap gap-10 justify-center">
        <div className="read h-96 w-80 bg-slate-200 rounded-xl border-purple-800 border-2 relative">
          <span className="headTitle absolute left-3 -top-5 text-xl font-bold border-purple-800 border-2 px-2 rounded-md bg-white">
            Read
          </span>
          <div className="content overflow-y-scroll h-full pt-5 ">
            {/* dummy data .. not real */}
            {!Loaded && <Loader />}
            {Loaded &&
              (ReadBooks.length ? (
                ReadBooks.map((b, i) => {
                  return (
                    <div
                      key={i}
                      className="item my-2 text-left pl-3 hover:bg-purple-400 cursor-pointer"
                    >
                      <span>{i + 1} : </span>
                      <Link to={`/books/` + b.id}>
                        <span>{b.bookTitle.substr(0, 30)} </span>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col pt-10">
                  <h1 className="didnot-download font-bold text-purple-600">
                    {" "}
                    You didn`t Read Any Books Yet..
                  </h1>
                  ,
                  <img
                    alt="logo"
                    src="/images/logo.png"
                    className="w-10/12 m-auto mt-10 opacity-50"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="download w-80 h-96 bg-slate-200 rounded-xl border-purple-800 border-2 relative">
          <span className="headTitle absolute left-3 -top-5 text-xl font-bold border-purple-800 border-2 px-2 rounded-md bg-white">
            Download
          </span>
          <div className="content overflow-y-scroll h-full pt-5 ">
            {/* dummy data .. not real */}
            {!Loaded && <Loader />}
            {Loaded &&
              (DownloadedBooks.length ? (
                DownloadedBooks.map((b, i) => {
                  return (
                    <div
                      key={i}
                      className="item my-2 text-left pl-3 hover:bg-purple-400 cursor-pointer"
                    >
                      <span>{i + 1} : </span>
                      <Link to={`/books/` + b.id}>
                        <span>{b.bookTitle.substr(0, 30)} </span>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col pt-10">
                  <h1 className="didnot-download font-bold text-purple-600">
                    {" "}
                    You didn`t Download Any Books Yet..
                  </h1>
                  ,
                  <img
                    alt="logo"
                    src="/images/logo.png"
                    className="w-10/12 m-auto mt-10 opacity-50"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
