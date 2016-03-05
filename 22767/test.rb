require "google/api_client"
require "google_drive"

spreadsheet_key = "1-u-LSZ5KAaiOWbKaaSibVk6-K00LADiCmAgp--ehwQo"
google_drive_session = GoogleDrive.saved_session("config.json")
# google_drive_session.files.each do |file|
#   p file.title
# end

@worksheet = google_drive_session.spreadsheet_by_key(spreadsheet_key).worksheet_by_title("シート1")
parent = [["a", "b"], ["c", "d"]]
parent.each do |child|
  @worksheet.update_cells(@worksheet.num_rows + 1, 1, [child])
end
@worksheet.save
