declare module "algebrite" {
	interface Algebrite {
		run(input: string): string;
	}

	const Algebrite: Algebrite;
	export default Algebrite;
}
