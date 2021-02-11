
function main() {
	keywords = AdWordsApp.keywords()
		.withCondition('CampaignStatus = ENABLED')
		.withCondition('AdGroupStatus = ENABLED')
		.withCondition('Status = ENABLED')
		.get()
	while (keywords.hasNext()) {
		keywords.next().bidding().setCpc(1)
	}
}
