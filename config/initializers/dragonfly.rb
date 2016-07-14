require 'dragonfly'
require 'dragonfly/s3_data_store'

# Configure
Dragonfly.app.configure do
  plugin :imagemagick

  secret "deb6159f00a89743f6c1a29830b6acb5583a9ea0d6535fb3f98d4e7a12565773"

  url_format "/media/:job/:name"

  # if Rails.env.test? or Rails.env.development?
  #   datastore :file,
  #     root_path: Rails.root.join('public/system/dragonfly', Rails.env),
  #     server_root: Rails.root.join('public'),
  #     # fog_storage_options: { path_style: true }
  # else
  datastore :s3,
    bucket_name: ENV['S3_BUCKET_NAME'],
    access_key_id: ENV['AWS_ACCESS_KEY_ID'],
    secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
      # url_host: ENV['AWS_CLOUDFRONT_DISTRIBUTION'],
      # fog_storage_options: { path_style: true }
  # end
end

# Logger
Dragonfly.logger = Rails.logger

# Mount as middleware
Rails.application.middleware.use Dragonfly::Middleware

# Add model functionality
if defined?(ActiveRecord::Base)
  ActiveRecord::Base.extend Dragonfly::Model
  ActiveRecord::Base.extend Dragonfly::Model::Validations
end



