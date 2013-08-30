fs      = require 'fs'
{exec,spawn} = require 'child_process'
#task = invoke = option = ->

# ANSI Terminal Colors.
bold = red = green = reset = ''
unless process.env.NODE_DISABLE_COLORS
  bold  = '\x1B[0;1m'
  red   = '\x1B[0;31m'
  green = '\x1B[0;32m'
  reset = '\x1B[0m'

log = (error, stdout, stderr) ->
  console.log stdout, stderr
  #console.log(error.message) if error?

clean = (root) ->
  try
    files = fs.readdirSync root
  catch e
    log null, '', e.message
    return
  if  files.length > 0
    for file in files
      path = "#{root}/#{file}"
      stat = fs.lstatSync path
      if stat.isFile() or stat.isSymbolicLink()
        fs.unlinkSync path
      else
        clean path
  fs.rmdirSync root

option '-v', '--verbose [LEVEL]', 'set groc\'s verbosity level during documentation generation. [0=silent,1,2,3]'

groc = (verbose = 1, options = []) ->
  pkg = require './package.json'
  options.push '--title'
  options.push "#{pkg.name} [ version #{pkg.version} ]"
  options.push '--languages'
  options.push process.cwd() + '/misc/groc_languages'
  if verbose? and 0 < verbose
    options.push '--verbose' if 1 < verbose
    options.push '--very-verbose' if 2 < verbose
  else
    options.push '--silent'
  spawn 'groc', options, stdio: 'inherit', cwd: '.'

rebuild = false

task 'all', 'invokes “clean”, “build” and “test” in given order', ->
  console.log 'all'
  rebuild = true
  invoke 'clean'
  invoke 'build'
  invoke 'test'
  invoke 'doc'

task 'build', 'invokes “build:once” and “build:parser” in given order', ->
  console.log 'build'
  rebuild = true
  invoke 'build:once'
  invoke 'build:parser'

task 'clean', 'cleans “lib/” and “test/” folders', ->
  console.log 'clean'
  clean 'lib'

task 'build:watch', 'compile coffee-script in “src/” to javascript in “lib/” continiously', ->
  console.log 'build:watch'
  spawn 'coffee', '-o ../lib/ -mcw .'.split(' '), stdio: 'inherit', cwd: 'src'

task 'build:once', 'compile coffee-script in “src/” to javascript in “lib/” once', ->
  console.log 'build:once'
  spawn 'coffee', '-o ../lib/ -mc .'.split(' '), stdio: 'inherit', cwd: 'src'

task 'build:parser', 'rebuild the goatee-script parser; run at least “build:once” first!', ->
  console.log 'build:parser'

  js  = './lib/Parser.js'
  cs  = './src/Grammar.coffee'
  map = js.replace(/\.js$/, '.map')

  mapStat = fs.existsSync map
  jsStat  = if fs.existsSync js then fs.statSync js else false
  csStat  = if fs.existsSync cs then fs.statSync cs else false

  if (rebuild is true or mapStat isnt false or jsStat is false or
      jsStat.mtime < csStat.mtime or jsStat.size < csStat.size)
    require 'jison' # TODO This seems to be important, have to figure out why !
    {Grammar} = require(cs.replace(/\.coffee$/,''))
    grammar   = new Grammar
    fs.writeFileSync js, grammar.create()
  try fs.unlinkSync map if rebuild is true or mapStat is true

task 'test', 'run “build” task and tests in “tests/” afterwards', ->
  console.log 'test'
  invoke 'build' if rebuild is false
  spawn 'npm', ['test'], stdio: 'inherit', cwd: '.'

task 'doc', 'invokes “doc:source” and “doc:github” in given order', ->
  console.log 'doc'
  invoke 'doc:source'
  #invoke 'doc:github'

task 'doc:source', 'rebuild the internal documentation', (options) ->
  console.log 'doc:source'
  clean 'doc'
  groc options['verbose']

task 'doc:github', 'rebuild the github documentation', (options) ->
  console.log 'doc:github'
  groc options['verbose'], ['--github']

option '-p', '--prefix [DIR]', 'set the installation prefix for `cake install`'

task 'install', 'install GoateeRules into /usr/local (or --prefix)', (options) ->
  console.log 'install'
  base = options.prefix or '/usr/local'
  lib  = "#{base}/lib/goatee-rules"
  bin  = "#{base}/bin"
  node = "~/.node_libraries/goatee-rules"
  console.log   "Installing GoateeRules to #{lib}"
  console.log   "Linking to #{node}"
  console.log   "Linking 'goatee' to #{bin}/goatee-rules"
  exec([
    "mkdir -p #{lib} #{bin}"
    "cp -rf bin lib LICENSE README.md package.json src #{lib}"
    "ln -sfn #{lib}/bin/goatee-rules #{bin}/goatee-rules"
    "mkdir -p ~/.node_libraries"
    "ln -sfn #{lib}/lib/goatee-rules #{node}"
  ].join(' && '), (err, stdout, stderr) ->
    if err then console.log stderr.trim() else log 'done', green
  )
