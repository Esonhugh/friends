import * as fs from 'fs';
import type { PersonalData } from './src/lib/PersonalData';
import ts from 'typescript';

function main(): number {
	console.log('Start processin the issues');
	let args = process.argv.slice(2);
	console.debug(`command: node-ts ./helper.ts ${args}`);
	if (args.length != 1) {
		console.error('Usage: pnpm issue-helper file.yaml');
		return 1;
	}
	let filename = args[0];

	let content = fs.readFileSync(filename).toString();
	console.debug('Read file content:');
	console.debug(content);
	let friendObj: PersonalData = JSON.parse(content);
	if (!(friendObj.alias && friendObj.avatar && friendObj.remark && friendObj.url)) {
		console.error('Error, read bad friend info json, missing alias avator remark url');
		return 2;
	}

	let targetFile = './src/lib/PersonalData.ts';
	let tsSource = fs.readFileSync(targetFile).toString();
	const sf = ts.createSourceFile(
		'example.ts',
		tsSource,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TS
	);

	function Operation(node: ts.Node, factory: ts.NodeFactory): ts.Node {
		if (ts.isArrayLiteralExpression(node)) {
			let bother = node.parent.getChildren();
			for (let b of bother) {
				if (ts.isIdentifier(b) && b.text == 'GlobalPool') {
					console.info(`Detect Array Declaretion: GlobalPool`);
				}
			}

			let PropertyList = [] as ts.PropertyAssignment[];
			for (let key in friendObj) {
				console.log(`Processing key ${key}`);
				// let keyProperty = factory.createStringLiteral(key);
				let valueProperty = factory.createStringLiteral(friendObj[key]);
				let Property = factory.createPropertyAssignment(key, valueProperty);
				PropertyList.push(Property);
			}
			console.info(PropertyList);
			var el = factory.createObjectLiteralExpression(PropertyList);
			// node.elements.concat(el);
			node = factory.updateArrayLiteralExpression(node, [...node.elements, el]);
			console.log('trying to update node');
		}
		// console.log(`${'|'.repeat(depth * 2)}-${ts.SyntaxKind[node.kind]}`);
		return node;
	}

	const add = (context) => (rootNode) => {
		function visit(node) {
			const { factory } = context;
			return ts.visitEachChild(Operation(node, factory), visit, context);
		}
		return ts.visitNode(rootNode, visit);
	};

	const result = ts.transform(sf, [add]);
	const transformedSourceFile = result.transformed[0];
	const printer = ts.createPrinter({
		newLine: ts.NewLineKind.LineFeed,
		removeComments: false,
		omitTrailingSemicolon: true
	});
	const out = printer.printFile(transformedSourceFile);
	console.info('Updated source code with: \n', out);
	fs.writeFileSync(targetFile, out);
	return 0;
}

process.exit(main());
