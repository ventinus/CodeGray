Rails.application.routes.draw do
  devise_for :administrators,
  controllers: {
    confirmations: 'admin/confirmations',
    passwords:     'admin/passwords',
    sessions:      'admin/sessions'
  },
  path: 'admin'

  concern :publishable do
    get 'publish',   action: 'publish'
    get 'unpublish', action: 'unpublish'
  end

  namespace :admin do
    root 'application#index'

    resources :administrators, except: :show

    resources :projects, except: :show do
      member { concerns :publishable }
    end

    resources :companies, except: :show

  end
end
