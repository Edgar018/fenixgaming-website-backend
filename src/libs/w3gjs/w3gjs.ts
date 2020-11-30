import W3GReplay from "w3gjs"

const parse = new W3GReplay();
export const getDataOfReplay = async (replay: string) => {
				return await parse.parse(replay);
}

