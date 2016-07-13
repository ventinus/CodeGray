Rails.application.routes.draw do

  # get '/' => 'pages#index'
  root :controller => 'pages', :action => 'index'

  resources :inquiries, only: [:create]

end
