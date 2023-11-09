import React from "react";

// Adding event handlers
const Button = () => {
  const handleClick = () => {
    alert('You Clicked me!');
  };
  return (
      <div>
          <h1>Adding event handlers</h1>
          <button onClick={handleClick}>Click me</button>
          <button onClick={() => {
              alert('You clicked Here!');
          }}>Click Here</button>
      </div>
  );
};

// Reading props in event handlers
const Toolbar = () => {
    const AlertButton = ({message, children}) => {
        return (
            <button onClick={() => alert(message) }>{children}</button>
        );
    };
  return (
      <div>
          <h1>Reading props in event handlers</h1>
          <AlertButton message="Playing!">Play Movie</AlertButton>
          <AlertButton message="Uploading!">Upload Image</AlertButton>
      </div>
  )
};

// Passing event handlers as props
const PlayToolbar = () => {
    const Button = ({onClick, children}) => {
        return (
                <button onClick={onClick}>{children}</button>
            )
    };

    const PlayButton = ({movieName}) => {
        const handlePlayClick = () => {
            alert(`Playing ${movieName}`);
        }

        return (
          <Button onClick={handlePlayClick}>Play "{movieName}"</Button>
        );
    };

    const UploadButton = () => {
        return (
            <Button onClick={() => alert('Uploading!')}>Upload Image</Button>
        );
    }

    return (
        <div>
            <h1>Passing event handlers as props</h1>
            <PlayButton movieName="Kiki's Delivery Service" />
            <UploadButton />
        </div>
    );
};

// Naming event handler props
const NamingButton = () => {
    const Button = ({onSmash, children}) => {
        return(
            <button onClick={onSmash}>{children}</button>
        );
    };

    return(
        <div>
            <h1>Naming event handler props</h1>
            <Button onSmash={() => alert('Playing!')}>
                Play Movie
            </Button>
            <Button onSmash={() => alert('Uploading!')}>
                Upload Image
            </Button>
        </div>
    );
};

const NamingButton2 = () => {
    const Toolbar = ({onPlayMovie, onUploadImage}) => {
        return (
            <div>
                <Button onClick={onPlayMovie}>
                    Play Movie
                </Button>
                <Button onClick={onUploadImage}>
                    Upload Image
                </Button>
            </div>
        );
    };

    const Button = ({onClick, children}) => {
        return (
          <button onClick={onClick}>
              {children}
          </button>
        );
    };

    return (
        <div>
            <h1>Naming event handler props</h1>
            <Toolbar
            onPlayMovie = {() => alert('Playing!')}
            onUploadImage = {() => alert('Uploading!')}
            />
        </div>
    );
};

// Event propagation
const ClassToolbar = () => {
    return (
        <div className="ClassToolbar" onClick={() => {
            alert('You clicked on the class toolbar!')
        }}>
            <h1>Event propagation</h1>
            <button onClick={() => alert('Playing!')}>
                Play Movie
            </button>
            <button onClick={() => alert('Uploading!')}>
                Upload Image
            </button>
        </div>
    )
}

// Stopping propagation
const StopButton = () => {
    const Button = ({onClick, children}) => {
        return (
            <button onClick={e => {
                e.stopPropagation();
                onClick();
            }}>
                {children}
            </button>
        )
    }
    return (
          <div className="Toolbar" onClick={ () => {
              alert('You Clicked on the Toolbar!')
          }}>
              <h1>Stopping propagation</h1>
              <Button onClick={() => alert('Playing!')}>
                  Play Movie
              </Button>
              <Button onClick={() => alert('Uploading!')}>
                  Upload Image
              </Button>
          </div>
    );
};

// Preventing default behavior
const Signup = () => {
    return (
        <div>
            <h1>Preventing default behavior</h1>
            <form onSubmit={e => {
                e.preventDefault();
                alert('Submitting!');
            }}>
                <input/>
                <button>Send</button>
            </form>
        </div>
    );
}

// e.stopPropagation() 위 태그에 연결된 이벤트 핸들러의 실행을 중지합니다.
// e.preventDefault() 이를 포함하는 몇 가지 이벤트에 대한 기본 브라우저 동작을 방지합니다.


const RespondingEvents = () => {
    return (
        <div>
            <Button />
            <br/>
            <Toolbar />
            <br />
            <PlayToolbar />
            <br />
            <NamingButton />
            <br />
            <NamingButton2 />
            <br />
            <ClassToolbar />
            <br />
            <StopButton />
            <br />
            <Signup />
        </div>
    )
};
export default RespondingEvents;
