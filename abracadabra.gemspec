# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'abracadabra/version'

Gem::Specification.new do |spec|
  spec.name          = "abracadabra"
  spec.version       = Abracadabra::Rails::VERSION
  spec.authors       = ["Trevor Hinesley"]
  spec.email         = ["trevor.hinesley@gmail.com"]
  spec.summary       = %q{The gem that swaps out text with a fully-compliant Rails form in one click using JQuery.}
  spec.description   = %q{Abracadabra: The gem that swaps out text with a fully-compliant Rails form in one click using JQuery and rails.js.}
  spec.homepage      = "https://github.com/TrevorHinesley/abracadabra"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "rails", ">= 3.2.11"

  spec.add_development_dependency "bundler", "~> 1.5"
  spec.add_development_dependency "rake"
end
