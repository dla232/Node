const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ReplaceHashWebpackPlugin = require('replace-hash-webpack-plugin');
const pageTitle = '메이플 스토리' //html 페이지 title
const itemPath = 'maplestory'; //css,js에 사용되는 게임이름
const lwiPath = 'maplestory'; // 이미지경로에 사용될 게임이름 (s1,s3와 같다면 똑같이 적어줄것 - 간혹 다른경우가 존재하여 따로 작성)
const projcetYear = '2023'; //해당 프로젝트 연도
const projcetDate = '0509'; // 해당 프로젝트 open일자
const projectName = ''; // 해당 프로젝트 이름
const _hash = '2432838BDFC551CB'; // hash값 (따로 hash를 생성하여 적어줄 것)

const project = `${projcetDate}`;
const imgLocation = `${projcetDate}_${_hash}`
const tpl = {
   img: `https://lwi.nexon.com/${lwiPath}/${projcetYear}/${project}_${_hash}`,
//	img: `../${project}_${_hash}`,
   //img: `0217_newRapid_9B73E82CD27F4DE5`,
  css: `https://lwres.nexon.com/css/${itemPath}/${projcetYear}`,
  //css: `css`,
  js: `https://lwres.nexon.com/js/${itemPath}/${projcetYear}`
  //js: `js`
}
let a = '';
module.exports =  (env, options) =>{

	return{
		entry: {
			event: path.resolve(__dirname, './src/index.js'),
		},
		output: {
			path: path.resolve(__dirname, './dist'),
			filename: `./js/[name]_${projcetDate}_${_hash}.js`,
		},
		devServer: {
			static: {
				directory: path.join(__dirname, './src'),
			},
			client: {
				overlay: true,
			},
			hot: true,
			open: true
		},
		stats: 'errors-only',
		module: {
			rules: [
				// sass compile
				{
					test: /\.(s[ac]ss|css)$/,
					use: [
						{
							loader : env.variable === 'local' ? 'style-loader' : MiniCssExtractPlugin.loader,
						},
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass'), //dart-sass
								sassOptions: {
									fiber: require('fibers'), //fibers
								},
							},
						},
					]
				}, 
				// {
				// 	test: /\.(jpe?g|png|gif|svg)$/,
				// 	use : [
				// 		'file-loader?name=img/[name]_[hash].[ext]',
				// 		'image-webpack-loader'
				// 	]
				// },
				// 이미지 해시 처리
				{
					test: /\.html$/i,
					use: {
						loader: "html-loader",
						options:  {
							minimize: false,
						}
					}
				},
				//해당 HTML 내에 _off / _on 형태일때는 해시 이미지 처리 제외
				{
					test: /(_off|_on).png$/i,
					use: {
						loader: 'url-loader',
						options: {
							publicPath: env.variable === 'local' ? `../${imgLocation}` : tpl.img,
							name: '[name].[ext]',
							outputPath: imgLocation,
							limit: false, 
						},
					},
				},
				//이미지 경로 해시 처리
				{
					test: /(?=^((?!_wft_).)*$)+.*(?=\.(png|jpe?g|gif|svg|webp|mp3)$)/i,
					//test: /(?=\.(png|jpe?g|gif|svg|webp|mp3)$)/i,
					use: {
						loader: 'url-loader',
						options: {
							publicPath: env.variable === 'local' ? `../${imgLocation}` : tpl.img,
							name: '[name]_wft_[hash].[ext]',
							outputPath: imgLocation,
							limit: false, /*용량 제한 5키로*/
						},
					},
				},
				
				// {
				// 	test: /\.(png|jpe?g|gif|svg|webp)$/i,
				// 	use: {
				// 		loader: 'image-webpack-loader',
				// 		options: {
				// 			mozjpeg: {
				// 				progressive: true,
				// 			  },
				// 			  // optipng.enabled: false will disable optipng
				// 			  optipng: {
				// 				enabled: false,
				// 			  },
				// 			  pngquant: {
				// 				quality: [0.65, 0.90],
				// 				speed: 4
				// 			  },
				// 			  gifsicle: {
				// 				interlaced: false,
				// 			  },
				// 			  // the webp option will enable WEBP
				// 			  webp: {
				// 				quality: 75
				// 			  }
				// 		},
				// 	},
				// },
				
				{
					test: /\.(js|jsx)$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
				// image tag replace in js
				{
					test: /\.(js|jsx)$/,
					loader: 'string-replace-loader',
					options: {
						multiple: [
							{ search: `src="./img`, replace: env.variable === 'local' ? `src="./images` : `src="${tpl.img}` },
							{ search: `src='./img`, replace: env.variable === 'local' ? `src='./images` : `src='${tpl.img}` }
					 	],
						flags: 'g',
					}
				},
			],
		},
		resolve: {
			extensions: ['*', '.js', '.jsx']
		},
		//js uglify
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					//test: /\.js(\?.*)?$/i,
				}),
			],
		},
		plugins: [
			// 빌드일자 자동 생성
			new webpack.BannerPlugin({
				banner: `
					Build Date : ${new Date().toLocaleString()}
				`
			}),
			//index template
			new HtmlWebpackPlugin({
				template: path.join(__dirname, 'src', 'index.html'),
				templateParameters: {
					env: env.variable === 'local' ? `${pageTitle}(개발용)` : pageTitle,
				},
				minify:false,
				filename: 'html/index.html'
			}),
			//css 추출 및 경로설정
			new MiniCssExtractPlugin({
				filename: `./css/event_${projcetDate}_${_hash}.css`
			}),
			// image copy 경로 재설정 빌드시 이미지 경로
			new CopyWebpackPlugin({
				patterns: [
					//이미지 _off , _on , _wft_ 제외 하고 해시 추가
					{
						from: './src/img/wft', 
						to: `${imgLocation}/[name].[ext]`,
						force: true,
						//globOptions: {
						//	ignore: [
						//		"**/*_off*",
						//		"**/*_on*",
						//		"**/*_wft_*",
						//	],
						//},
					},
					//나머지 아래 _off , _on ,_wft_ 경우에는 파일 이름 그대로 복사해서 덮어쓰기
					/*{
						from: './src/img/wft/*_off*',
						to: `${imgLocation}/[name].[ext]`,
						force: true,
					},
					{
						from: './src/img/wft/*_on*',
						to: `${imgLocation}/[name].[ext]`,
						force: true,
					},
					*/
					/*{
						from: './src/img/*_wft_*',
						to: `${imgLocation}/[name].[ext]`,
						force: true,
					},*/
				]
			}),
			// react모듈 자동 등록
			new webpack.ProvidePlugin({
				React: 'react',
			}),
			//html파일 리소스 경로 재설정(build시에만)
			(env.variable == 'build') && 
			new HtmlReplaceWebpackPlugin([
				{
					pattern: 's.nx.com',
					replacement: 'ssl.nexon.com'
				},
				{
					pattern: './img',
					replacement: `${tpl.img}`
				},
				{
					pattern: 'src="./js',
					replacement: `src="${tpl.js}`
				},
				{
					pattern: 'href="./css',
					replacement: `href="${tpl.css}`
				},
			]),
			// dist 내용 자동 제거
			new CleanWebpackPlugin(),
		].filter(function(plugin) { return plugin !== false; })

	}
}