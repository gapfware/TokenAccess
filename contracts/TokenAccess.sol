// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenAccess is ERC721 {
    address public owner;
    uint256 public totalOccasions = 0;
    uint256 public totalSupply = 0;

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    mapping(uint256 => Occasion) occassions;
    mapping(uint256 => mapping(address => bool)) public hasBought;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => uint256[]) seatsTaken;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
 
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public onlyOwner {
        require(msg.sender == owner, "Only owner can list occasions");

        totalOccasions++;
        occassions[totalOccasions] = Occasion(
            totalOccasions,
            _name,
            _cost,
            _maxTickets,
            _maxTickets,
            _date,
            _time,
            _location
        );
    }

    function mint(uint256 _id, uint256 _seat) public payable {
        require(_id != 0, "Invalid occasion id");
        require(_id <= totalOccasions, "Occasion does not exist");
        require(msg.value >= occassions[_id].cost, "Insufficient funds");

        occassions[_id].tickets--; // <-- Actualiza la cantidad de tickets disponibles

        hasBought[_id][msg.sender] = true;
        seatTaken[_id][_seat] = msg.sender; // <-- Asignar un asiento a la persona que lo compro
        seatsTaken[_id].push(_seat); // <-- Agregar el asiento a la lista de asientos ocupados

        totalSupply++;
        _safeMint(msg.sender, totalSupply);
    }

    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        return occassions[_id];
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
