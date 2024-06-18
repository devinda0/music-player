import yashodaraImg from './yashodara.jpeg'
import yashodaraSong from './yashodara.mp3'
// import heenaDunnuAdareeImg from './Heena_Dunnu_Adaree.jpeg'
import heenaDunnuAdareeSong from './Heena_Dunnu_Adaree.mp3'

const forYou = [
    {
        name:"Yashodara",
        author:"Gangadara",
        img:yashodaraImg,
        song:yashodaraSong
    },
    {
        name:"Heena Dunnu Adaree",
        author:"Ramidu, Themiya Thejan",
        img:"http://localhost:3005/api",
        song:heenaDunnuAdareeSong
    },
    {
        name:"Yashodara",
        author:"Gangadara",
        img:yashodaraImg,
        song:yashodaraSong
    },
    {
        name:"Heena Dunnu Adaree",
        author:"Ramidu, Themiya Thejan",
        img:"http://localhost:3005/api",
        song:heenaDunnuAdareeSong
    },
    {
        name:"Yashodara",
        author:"Gangadara",
        img:yashodaraImg,
        song:yashodaraSong
    },
    {
        name:"Heena Dunnu Adaree",
        author:"Ramidu, Themiya Thejan",
        img:"http://localhost:3005/api",
        song:heenaDunnuAdareeSong
    },
];

const topMixes = [
    {
        name:"Yashodara",
        author:"Gangadara",
        img:yashodaraImg,
    },
    {
        name:"Yashodara",
        author:"Gangadara",
        img:yashodaraImg,
    },
    {
        name:"Yashodara",
        author:"Gangadara",
        img:yashodaraImg,
    }
]


const recommended = [
    {
        name:"Yashodara",
        author:"Gangadara",
        img:yashodaraImg,
    },
    {
        name:"Yashodara",
        author:"Gangadara",
        img:yashodaraImg,
    }
]

const DisplayData = {
    data:[
        {
            name:"For you",
            items:forYou
        },
        {
            name:"Top mixex",
            items:topMixes
        },
        {
            name:"Recommended",
            items:recommended
        }
    ]
}

export default DisplayData;