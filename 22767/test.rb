require "google/api_client"
require "google_drive"

session = GoogleDrive.saved_session("config.json")
session.files.each do |file|
  p file.title
end
