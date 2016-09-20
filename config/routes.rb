Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "pictures#show"
  resources :pictures, :only => [:show, :index]
  resources :tags, :only => [:create, :destroy]
end
