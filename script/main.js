const lookMemes = document.querySelector(".buttonOne");
gifFetch();

lookMemes.addEventListener("click", () => {
  return gifFetch();
});

async function gifFetch() {
  // http://alpha-meme-maker.herokuapp.com/:page
  let memes = [];
  let response = await fetch(`https://api.imgflip.com/get_memes`);
  let json = await response.json();

  Array.from(json.data.memes).forEach((e, i) => {
    let cmd = e.name.replace(" ", "").slice(0, 3);
    memes.push({
      name: e.name ?? 'unknown',
      cmd: memes.includes({cmd:cmd}) ? `${cmd}${i}` : cmd,
      url: e.url,
    });
  });
  loadPage(memes);
}

function loadPage(memes) {
  let main = document.querySelector('.container');

  memes.forEach((e) => {
    let box = document.createElement('div');
    box.className = 'item';

    let img = document.createElement('img');
    img.src = e.url;
    box.append(img);

    let hr = document.createElement('hr');
    box.append(hr);

    let name = document.createElement('h1');
    name.innerHTML = e.name;
    box.append(name);

    let cmd = document.createElement('p');
    cmd.innerHTML = `Command : <b>${e.cmd}</b>`;
    box.append(cmd);
    
    main.append(box);
  })
}
