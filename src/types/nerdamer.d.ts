declare module "nerdamer" {
	interface Expression {
		toTeX(): string;
		toString(): string;
		text(): string;
	}

	function nerdamer(expression: string, subs?: Record<string, string>): Expression;

	export default nerdamer;
}

declare module "nerdamer/Algebra" {}
declare module "nerdamer/Calculus" {}
declare module "nerdamer/Solve" {}
