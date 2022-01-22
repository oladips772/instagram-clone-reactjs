/** @format */
import React from "react";

const suggested = [
  {
    id: 1,
    username: "Robert",
    avatar:
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/3C8A/production/_107189451_hi054338739.jpg",
    title: "Nollywood top rated",
  },
  {
    id: 2,
    username: "Dybala",
    avatar:
      "https://cdn.vox-cdn.com/thumbor/m2-k-R1l2oI04DSKFT77dOUDr8c=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23069630/1357348925.jpg",
    title: "Juventus star and false 9 striker",
  },
  {
    id: 3,
    username: "Mandela",
    avatar:
      "https://i.natgeofe.com/n/714a154d-2b89-4606-8d78-10cad2aa1c62/nelson-mandela-09060209807_square.jpg",
    title: "historic human right activist",
  },
  {
    id: 4,
    username: "Umtiti",
    avatar:
      "https://cdn.resfu.com/media/img_news/agencia-efe_multimedia_4319813.multimedia.photos.16776798.file.jpg?size=1000x&ext=jpeg",
    title: "center back FcBarcelona",
  },
  {
    id: 5,
    username: "Iniesta",
    avatar:
      "https://icdn.football-espana.net/wp-content/uploads/2021/11/vissel-kobe-v-shanghai-sipg-afc-champions-league-round-of-16.jpg",
    title: "former captaine, FcBarcelona ",
  },
];

function Suggestions() {
  return (
    <div>
      {/* user div */}
      <div className="flex items-center">
        <img
          src="https://media-exp1.licdn.com/dms/image/C4E03AQFOfPu93n6Kxw/profile-displayphoto-shrink_200_200/0/1632301101571?e=1647475200&v=beta&t=mn3e607trJc74pC6N2ZV4hHT7uB7xfavOKA7o_TRxKA"
          className="h-10 w-10 rounded-full mr-2"
          alt=""
        />
        {/* user info div */}
        <div className="flex flex-col w-full mr-4">
          <h3 className="font-bold -mb-1">oladipupo</h3>
          <p className="text-sm text-gray-600">oladips200@gmail.com</p>
        </div>
        <button className="text-blue-600 font-bold">Logout</button>
      </div>
    </div>
  );
}

export default Suggestions;
