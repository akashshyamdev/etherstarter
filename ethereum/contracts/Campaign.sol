// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CampaignFactory {
	address[] public deployedCampaigns;

	function createCampaign(uint256 minimum) public {
		address newCampaign = address(new Campaign(minimum, msg.sender));
		deployedCampaigns.push(newCampaign);
	}

	function getDeployedCampaigns() public view returns (address[] memory) {
		return deployedCampaigns;
	}
}

contract Campaign {
	struct Request {
		string description;
		uint256 value;
		address recipient;
		bool complete;
		uint256 approvalCount;
		mapping(address => bool) approvals;
	}

	mapping(uint256 => Request) public requests;
	uint256 private currentIndex = 0;
	address public manager;
	uint256 public minimumContribution;
	mapping(address => bool) public approvers;
	uint256 public approversCount;

	modifier restricted() {
		require(msg.sender == manager);
		_;
	}

	constructor(uint256 minimum, address creator) {
		manager = creator;
		minimumContribution = minimum;
	}

	function contribute() public payable {
		require(msg.value > minimumContribution);

		approvers[msg.sender] = true;
		approversCount++;
	}

	function createRequest(
		string memory description,
		uint256 value,
		address recipient
	) public restricted {
		Request storage newRequestInStorage = requests[currentIndex];

		newRequestInStorage.description = description;
		newRequestInStorage.value = value;
		newRequestInStorage.recipient = recipient;
		newRequestInStorage.complete = false;
		newRequestInStorage.approvalCount = 0;

		currentIndex++;
	}

	function approveRequest(uint256 index) public {
		Request storage request = requests[index];

		require(approvers[msg.sender]);
		require(!request.approvals[msg.sender]);

		request.approvals[msg.sender] = true;
		request.approvalCount++;
	}

	function finalizeRequest(uint256 index) public restricted {
		Request storage request = requests[index];

		require(request.approvalCount > (approversCount / 2));
		require(!request.complete);

		payable(request.recipient).transfer(request.value);
		request.complete = true;
	}
}
