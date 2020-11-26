import { Document, model, Schema } from "mongoose";
import marked from "marked";
import slugify from "slugify";
import createDomPurify from "dompurify";
import { JSDOM } from "jsdom";

const window: any = (new JSDOM("")).window;
const dompurify = createDomPurify(window);

interface IArticle extends Document {
	title: string;
	description: string;
	markdown: string;
	createdAt: Date;
	slug: string;
	santitizedHtml: string;
}

const articleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	markdown: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	santitizedHtml: {
		type: String,
		required: true
	}
});

articleSchema.pre<IArticle>("validate", function(next) {
	if (this.title) {
		this.slug = slugify(this.title, { lower: true, strict: true });
	}
	if (this.markdown) {
		this.santitizedHtml = dompurify.sanitize(marked(this.markdown));
	}

	next();
});


export default model<IArticle>("Article", articleSchema);
