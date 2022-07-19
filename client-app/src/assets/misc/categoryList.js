export const categoryList = [
    { name: "Sports", id: 1 },
    { name: "Movie", id: 2 },
    { name: "Gaming", id: 3 },
    { name: "Funny", id: 4 },
    { name: "Astrology", id: 6 },
    { name: "Literature", id: 7 },
]

export function convertNameToId(nameArr) {
    let idArr = [];
    nameArr.forEach((name) => {
        categoryList.forEach((category) => {
            if (name === category.name) idArr.push({ tagID: category.id });
        })
    })
    return idArr;
}