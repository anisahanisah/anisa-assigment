import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);

  const deletePhoto = async (id) => {
    let Url="https://gallery-app-server.vercel.app/photos" +id;
    await fetch( Url , {
      method: "DELETE"
    })
    const filter = photos.filter((photo) => photo.id !== id)
    setPhotos(filter)
    // TODO: answer here
  };

  useEffect(() => {
    setLoading(true);
    if (sort) {
      let url=`https://gallery-app-server.vercel.app/photos?_sort=id&_order=${sort}`
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setPhotos(json);
          setLoading(false);
        });
    }

    if (submited) {
      let url=`https://gallery-app-server.vercel.app/photos?q=${submited}`
      fetch(url)
        .then((response) => {
          response.json();
        })
        .then((json) => {
          setPhotos(json);
          setLoading(false);
        });
    }
    if (search) {
      let url= `https://gallery-app-server.vercel.app/photos?q=${search}`
      fetch(url)
        .then((response) => {
          response.json();
        })
        .then((json) => {
          setPhotos(json);
          setLoading(false);
        });
    }
    
  }, [sort, submited,search]);

  useEffect(() => {
  setLoading(true);
  let url ="https://gallery-app-server.vercel.app/photos"
  fetch(url)
  .then((response) => {return response.json()})
  .then((json) =>{ 
    setPhotos(json);
    setLoading(false);
  });
    
  }, []);

  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
