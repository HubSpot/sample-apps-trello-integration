module Services
  module Hubspot
    module Authorization
      class Authorize
        def initialize(tokens:)
          @tokens = tokens.with_indifferent_access
        end

        def call
          ::Hubspot.configure do |config|
            config.access_token = @tokens[:access_token]
          end
        end
      end
    end
  end
end