import { code } from './_k';

const c = (slug: string, title: string, keywords: string[], content: string) => code('ruby', slug, title, keywords, content);

export const CODE_RUBY = [
  c('basics', 'Ruby basics: syntax, blocks, arrays, hashes, classes, modules, Rails essentials', ['ruby basics', 'ruby blocks', 'ruby hash', 'ruby array methods', 'ruby class', 'ruby on rails', 'ruby each map', 'ruby symbols', 'gem bundler'],
    `name = "Ana"; puts "Hi #{name}"; p obj (inspect); everything is an object (5.times { }, "hi".upcase). Only nil and false are falsy. Symbols :name are lightweight immutable identifiers (hash keys).
Control: if/elsif/else/end, unless, modifiers (puts "ok" if ready), case x when 1..5 then ... when String then ... else ... end, while/until, loop do ... break if done end, ternary.
Arrays: nums = [1, 2, 3]; nums << 4; nums.each { |n| puts n }; nums.map { |n| n * 2 }; select/filter, reject, find, reduce(:+) / sum, sort_by { |u| u[:age] }, group_by, each_with_index, each_slice(2), include?, uniq, flatten, first/last, min/max, tally (counts), zip, compact (remove nils).
Hashes: user = { name: "Ana", age: 20 }; user[:name]; user[:city] = "Montreal"; user.fetch(:email, "none"); user.each { |k, v| }; transform_values, select, key?, dig(:a, :b), to_a; default values Hash.new(0) for counting.
Strings: upcase, downcase, capitalize, strip, split(","), gsub(/a/, "b"), include?, start_with?, length, reverse, * 3, chars, format("%.2f", x), heredocs <<~TEXT.
Methods: def greet(name = "you", greeting: "Hi") "#{greeting}, #{name}" end (implicit return of the last expression; keyword args); methods ending in ? return booleans, ! mutate/are dangerous.
Blocks/procs/lambdas: yield inside methods; &block; ->(x) { x * 2 }.call(3); File.open("f.txt", "w") { |f| f.puts "hi" } closes automatically.
Classes: class Dog < Animal; attr_accessor :name; attr_reader :age; def initialize(name) @name = name end; def to_s = "Dog #{@name}"; end — @instance vars, @@class vars (avoid), self.class_method, private section, super. Modules for namespaces and mixins (include Comparable + <=>, Enumerable + each).
Errors: begin ... rescue ZeroDivisionError => e ... ensure ... end; raise ArgumentError, "msg"; custom class MyError < StandardError.
Tooling: gem install x, Bundler (Gemfile, bundle install, bundle exec), irb (REPL), RuboCop, RSpec/Minitest tests.
Rails: rails new app; rails g scaffold Post title:string body:text; rails db:migrate; MVC (models with ActiveRecord: Post.where(published: true).order(created_at: :desc), validations validates :title, presence: true, associations has_many/belongs_to), config/routes.rb (resources :posts), controllers (def index @posts = Post.all end), ERB views (<%= @post.title %>), strong params (params.require(:post).permit(:title, :body)), Hotwire/Turbo. Sinatra for tiny apps.`),
];
